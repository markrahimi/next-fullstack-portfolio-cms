import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { checkAuth } from "@/lib/auth-helper";

// GET all projects
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const projects = await Project.find({ published: true }).sort({ date: -1 });

    // Transform to match frontend format
    const transformedProjects = projects.map((project) => ({
      id: project.id,
      title: project.title[lang as "en" | "fr"],
      description: project.description[lang as "en" | "fr"],
      image: project.image,
      tags: project.tags,
      github: project.github,
      demo: project.demo,
      date: project.date,
      category: project.category,
      color: project.color,
    }));

    return NextResponse.json(transformedProjects);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST new project (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();
    const project = await Project.create(body);

    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
