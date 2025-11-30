import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all projects (admin - includes unpublished)
export async function GET(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const projects = await Project.find().sort({ date: -1 });

    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
