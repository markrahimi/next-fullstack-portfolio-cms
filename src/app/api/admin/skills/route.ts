import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { checkAuth } from "@/lib/auth-helper";

// GET all skills (admin - includes unpublished)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const skills = await Skill.find().sort({ order: 1 });

    return NextResponse.json(skills);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
