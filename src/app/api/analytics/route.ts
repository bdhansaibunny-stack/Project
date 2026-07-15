import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SearchHistory from '@/models/SearchHistory';
import Article from '@/models/Article';
import User from '@/models/User';
import Resource from '@/models/Resource';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const isAdmin = async (session: any) => {
  return session?.user && (session.user as any).role === 'admin';
};

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const totalSearches = await SearchHistory.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalArticles = await Article.countDocuments();
    const totalResources = await Resource.countDocuments();

    // Get search trends (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const searchTrend = await SearchHistory.aggregate([
      { $match: { timestamp: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$timestamp' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Get top queries
    const topQueries = await SearchHistory.aggregate([
      {
        $group: {
          _id: '$query',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
      {
        $project: {
          query: '$_id',
          count: 1,
          _id: 0,
        },
      },
    ]);

    return NextResponse.json(
      {
        totalSearches,
        totalUsers,
        totalArticles,
        totalResources,
        searchTrend: searchTrend.map((item: any) => ({
          date: item._id,
          count: item.count,
        })),
        topQueries,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
