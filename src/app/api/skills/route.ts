import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all skills
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const skills = await Skill.find({ published: true }).sort({ order: 1 });

    // Transform to match frontend format
    const transformedSkills = skills.map((skill) => ({
      title: skill.title[lang as "en" | "fr"],
      skills: skill.skills,
      color: skill.color,
    }));

    return NextResponse.json(transformedSkills);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST new skill (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const skill = await Skill.create(body);

    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
