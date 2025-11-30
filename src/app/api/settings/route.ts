import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Settings from "@/models/Settings";
import { checkAuth } from "@/lib/auth-helper";

// GET settings
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get the first (and should be only) settings document
    let settings = await Settings.findOne();

    // If no settings exist, create default settings
    if (!settings) {
      const created = await Settings.create({});
      settings = Array.isArray(created) ? created[0] : created;
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT update settings (admin only)
export async function PUT(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();

    const body = await request.json();

    // Get the first settings document or create if doesn't exist
    let settings = await Settings.findOne();

    if (!settings) {
      const created = await Settings.create(body);
      settings = Array.isArray(created) ? created[0] : created;
    } else {
      settings = await Settings.findByIdAndUpdate(
        settings._id,
        body,
        { new: true }
      );
    }

    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
