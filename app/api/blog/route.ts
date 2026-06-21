import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Post } from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import slugify from "@/lib/slugify";

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const all = searchParams.get("all") === "true";

  const filter = all ? {} : { published: true };
  const total = await Post.countDocuments(filter);
  const posts = await Post.find(filter)
    .sort({ publishedAt: -1, createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("-content");

  return NextResponse.json({ posts, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const slug = slugify(body.title) + "-" + Date.now();
  const post = await Post.create({ ...body, slug });
  return NextResponse.json(post, { status: 201 });
}
