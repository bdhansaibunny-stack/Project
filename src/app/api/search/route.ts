import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Article from '@/models/Article';
import SearchHistory from '@/models/SearchHistory';
import { generateAIResponse } from '@/lib/openai';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { query } = await req.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { message: 'Query is required' },
        { status: 400 }
      );
    }

    // Retrieve relevant articles (RAG retrieval phase)
    const articles = await Article.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [query] } },
      ],
    }).limit(5);

    // Prepare context for AI
    const context = articles
      .map((article) => `Title: ${article.title}\nContent: ${article.content}`)
      .join('\n\n---\n\n');

    // Generate AI response (RAG augmentation and generation)
    const aiResponse = await generateAIResponse(query, context);

    // Save search history
    const searchRecord = new SearchHistory({
      userId: (session.user as any).id,
      query,
      results: articles.length,
      aiResponse,
    });
    await searchRecord.save();

    return NextResponse.json(
      {
        query,
        response: aiResponse,
        sources: articles.map((a) => ({
          _id: a._id,
          title: a.title,
          slug: a.slug,
          category: a.category,
          excerpt: a.excerpt,
        })),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Search error:', error);
    return NextResponse.json(
      { message: error.message || 'Search failed' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const searchHistory = await SearchHistory.find({
      userId: (session.user as any).id,
    })
      .sort({ timestamp: -1 })
      .limit(20);

    return NextResponse.json(searchHistory, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to fetch history' },
      { status: 500 }
    );
  }
}
