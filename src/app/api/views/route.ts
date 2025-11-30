import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import View from "@/models/View";

export const dynamic = "force-dynamic";

// POST - Increment view count for a page
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { page } = await request.json();

    if (!page) {
      return NextResponse.json(
        { error: "Page parameter is required" },
        { status: 400 }
      );
    }

    // Increment or create view count
    const view = await View.findOneAndUpdate(
      { page },
      { $inc: { count: 1 } },
      { upsert: true, new: true }
    );

    return NextResponse.json({ page: view.page, count: view.count });
  } catch (error) {
    console.error("Error tracking view:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}

// GET - Get total views across all pages
export async function GET() {
  try {
    await connectDB();

    const views = await View.find();
    const totalViews = views.reduce((sum, view) => sum + view.count, 0);

    return NextResponse.json({
      totalViews,
      pages: views.map(v => ({ page: v.page, count: v.count })),
    });
  } catch (error) {
    console.error("Error fetching views:", error);
    return NextResponse.json(
      { error: "Failed to fetch views" },
      { status: 500 }
    );
  }
}
