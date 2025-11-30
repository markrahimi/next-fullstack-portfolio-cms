import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { checkAuth } from "@/lib/auth-helper";

// GET single blog
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const blog = await Blog.findOne({ id: parseInt(params.id), published: true });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    // Transform to match frontend format
    const transformedBlog = {
      id: blog.id,
      title: blog.title[lang as "en" | "fr"],
      excerpt: blog.excerpt[lang as "en" | "fr"],
      content: blog.content[lang as "en" | "fr"],
      image: blog.image,
      date: blog.date,
      readTime: blog.readTime,
      category: blog.category,
      tags: blog.tags,
      color: blog.color,
      featured: blog.featured,
    };

    return NextResponse.json(transformedBlog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const blog = await Blog.findOneAndUpdate(
      { id: parseInt(params.id) },
      body,
      { new: true }
    );

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const blog = await Blog.findOneAndDelete({ id: parseInt(params.id) });

    if (!blog) {
      return NextResponse.json(
        { error: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
