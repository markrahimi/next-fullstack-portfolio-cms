import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { checkAuth } from "@/lib/auth-helper";

export const dynamic = "force-dynamic";

// GET - Get all certificates (public)
export async function GET() {
  try {
    await connectDB();

    const certificates = await Certificate.find({ isActive: true })
      .sort({ order: 1, issueDate: -1 })
      .lean();

    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

// POST - Create new certificate (admin only)
export async function POST(request: NextRequest) {
  const authCheck = await checkAuth();
  if (!authCheck.authorized) {
    return authCheck.response;
  }

  try {
    await connectDB();
    const body = await request.json();

    const certificate = await Certificate.create(body);

    return NextResponse.json(certificate, { status: 201 });
  } catch (error) {
    console.error("Error creating certificate:", error);
    return NextResponse.json(
      { error: "Failed to create certificate" },
      { status: 500 }
    );
  }
}
