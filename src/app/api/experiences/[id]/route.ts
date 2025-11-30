import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { checkAuth } from "@/lib/auth-helper";

// GET single experience
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const experience = await Experience.findById(params.id);

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update experience (admin only)
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
    const experience = await Experience.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE experience (admin only)
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

    const experience = await Experience.findByIdAndDelete(params.id);

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
