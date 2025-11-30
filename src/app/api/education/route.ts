import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Education from "@/models/Education";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET all education
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const education = await Education.find({ published: true }).sort({ order: 1 });

    // Transform to match frontend format
    const transformedEducation = education.map((edu) => ({
      degree: edu.degree[lang as "en" | "fr"],
      status: edu.status,
      institution: edu.institution[lang as "en" | "fr"],
      location: edu.location[lang as "en" | "fr"],
      year: edu.year,
      courses: edu.courses[lang as "en" | "fr"],
      color: edu.color,
    }));

    return NextResponse.json(transformedEducation);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST new education (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const education = await Education.create(body);

    return NextResponse.json(education, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
