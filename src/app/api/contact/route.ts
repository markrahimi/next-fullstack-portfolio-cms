import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// POST new contact message (public)
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      status: "unread",
    });

    return NextResponse.json(
      { message: "Message sent successfully", id: contactMessage._id },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// GET all contact messages (admin only)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
