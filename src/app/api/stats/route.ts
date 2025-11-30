import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import mongoose from "mongoose";
import { checkAuth } from "@/lib/auth-helper";
import View from "@/models/View";

// GET - Get site statistics (admin only)
export async function GET() {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    // Get counts from different collections
    const [
      projectsCount,
      blogsCount,
      messagesCount,
      experiencesCount,
      educationCount,
      skillsCount,
      certificatesCount,
      views,
    ] = await Promise.all([
      mongoose.connection.db?.collection("projects").countDocuments() || 0,
      mongoose.connection.db?.collection("blogs").countDocuments() || 0,
      mongoose.connection.db?.collection("contacts").countDocuments() || 0,
      mongoose.connection.db?.collection("experiences").countDocuments() || 0,
      mongoose.connection.db?.collection("education").countDocuments() || 0,
      mongoose.connection.db?.collection("skillcategories").countDocuments() || 0,
      mongoose.connection.db?.collection("certificates").countDocuments() || 0,
      View.find(),
    ]);

    const totalViews = views.reduce((sum, view) => sum + view.count, 0);

    const stats = {
      projects: projectsCount,
      blogs: blogsCount,
      messages: messagesCount,
      experiences: experiencesCount,
      education: educationCount,
      skills: skillsCount,
      certificates: certificatesCount,
      totalViews: totalViews,
      totalContent: projectsCount + blogsCount + experiencesCount + educationCount + certificatesCount,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
