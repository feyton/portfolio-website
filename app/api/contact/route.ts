import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Contact } from "@/models/Contact";

export async function POST(req: NextRequest) {
  await connectDB();
  const body = await req.json();
  const { name, email, subject, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const contact = await Contact.create({ name, email, subject, message });
  return NextResponse.json({ ok: true, id: contact._id }, { status: 201 });
}
