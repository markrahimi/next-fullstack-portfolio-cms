import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { checkAuth } from "@/lib/auth-helper";

// GET all experiences
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const experiences = await Experience.find({ published: true }).sort({ order: 1 });

    // Transform to match frontend format
    const transformedExperiences = experiences.map((exp) => ({
      company: exp.company[lang as "en" | "fr"],
      role: exp.role[lang as "en" | "fr"],
      type: exp.type[lang as "en" | "fr"],
      duration: exp.duration[lang as "en" | "fr"],
      location: exp.location[lang as "en" | "fr"],
      description: exp.description[lang as "en" | "fr"],
      achievements: exp.achievements[lang as "en" | "fr"],
      color: exp.color,
    }));

    return NextResponse.json(transformedExperiences);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST new experience (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const experience = await Experience.create(body);

    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
