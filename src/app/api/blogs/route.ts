import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const blogs = await Blog.find({ published: true }).sort({ date: -1 });

    // Transform to match frontend format
    const transformedBlogs = blogs.map((blog) => ({
      id: blog.id,
      title: blog.title[lang as "en" | "fr"],
      excerpt: blog.excerpt[lang as "en" | "fr"],
      image: blog.image,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      tags: blog.tags,
      color: blog.color,
      featured: blog.featured,
    }));

    return NextResponse.json(transformedBlogs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST new blog (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const blog = await Blog.create(body);

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
