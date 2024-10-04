import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import dbConnect from '@/lib/mongodb';
import Todo from '@/models/Todo';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const todos = await Todo.find({ userId: session.user.id }).sort({ createdAt: -1 });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('GET todos error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { text } = await req.json();
    await dbConnect();

    const newTodo = new Todo({
      text,
      userId: session.user.id,
    });

    await newTodo.save();
    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('POST todo error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}