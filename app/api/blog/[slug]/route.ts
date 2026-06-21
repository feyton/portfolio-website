import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await connectDB();
  const post = await Post.findOne({ slug });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await Post.updateOne({ _id: post._id }, { $inc: { visits: 1 } });
  return NextResponse.json(post);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  await connectDB();
  const body = await req.json();
  const post = await Post.findOneAndUpdate({ slug }, body, { new: true });
  return NextResponse.json(post);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  await connectDB();
  await Post.findOneAndDelete({ slug });
  return NextResponse.json({ ok: true });
}
