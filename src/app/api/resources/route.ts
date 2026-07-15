import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resource from '@/models/Resource';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

const isAdmin = async (session: any) => {
  return session?.user && (session.user as any).role === 'admin';
};

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 10;
    const skip = (page - 1) * limit;

    const query: any = {};
    if (category) query.category = category;
    if (type) query.type = type;

    const resources = await Resource.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Resource.countDocuments(query);

    return NextResponse.json(
      {
        resources,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to fetch resources' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!(await isAdmin(session))) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const { title, description, category, url, type } = await req.json();

    const resource = new Resource({
      title,
      description,
      category,
      url,
      type,
    });

    await resource.save();

    return NextResponse.json(resource, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || 'Failed to create resource' },
      { status: 500 }
    );
  }
}
