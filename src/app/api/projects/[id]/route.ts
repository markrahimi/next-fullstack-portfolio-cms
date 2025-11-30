import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET single project
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") || "en";

    const project = await Project.findOne({ id: params.id, published: true });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    // Transform to match frontend format
    const transformedProject = {
      id: project.id,
      title: project.title[lang as "en" | "fr"],
      subtitle: project.subtitle[lang as "en" | "fr"],
      description: project.description[lang as "en" | "fr"],
      longDescription: project.longDescription[lang as "en" | "fr"],
      image: project.image,
      tags: project.tags,
      github: project.github,
      demo: project.demo,
      date: project.date,
      category: project.category,
      color: project.color,
      features: project.features[lang as "en" | "fr"],
      challenges: project.challenges.map((ch) => ({
        problem: ch.problem[lang as "en" | "fr"],
        solution: ch.solution[lang as "en" | "fr"],
      })),
      techStack: project.techStack[lang as "en" | "fr"],
      metrics: project.metrics.map((m) => ({
        label: m.label[lang as "en" | "fr"],
        value: m.value,
      })),
    };

    return NextResponse.json(transformedProject);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update project (admin only)
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
    const project = await Project.findOneAndUpdate(
      { id: params.id },
      body,
      { new: true }
    );

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE project (admin only)
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

    const project = await Project.findOneAndDelete({ id: params.id });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
