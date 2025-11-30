import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all experiences (admin - includes unpublished)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const experiences = await Experience.find().sort({ order: 1 });

    return NextResponse.json(experiences);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
