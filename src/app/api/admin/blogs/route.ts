import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all blogs (admin - includes unpublished)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const blogs = await Blog.find().sort({ date: -1 });

    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
