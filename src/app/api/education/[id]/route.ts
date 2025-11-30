import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { checkAuth } from "@/lib/auth-helper";

// GET single education
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

    const education = await Education.findById(params.id);

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update education (admin only)
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
    const education = await Education.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE education (admin only)
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

    const education = await Education.findByIdAndDelete(params.id);

    if (!education) {
      return NextResponse.json(
        { error: "Education not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Education deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
