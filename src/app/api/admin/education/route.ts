import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { checkAuth } from "@/lib/auth-helper";

// GET all education (admin - includes unpublished)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const education = await Education.find().sort({ order: 1 });

    return NextResponse.json(education);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
