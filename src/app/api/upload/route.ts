import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = body.name || "satellite_patch_mumbai.png";
    const size = body.size || "14.2 MB";
    
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    return NextResponse.json({
      success: true,
      fileName: name,
      fileSize: size,
      dimensions: "4096 x 4096 px",
      sensor: "Sentinel-2 L2A",
      captureDate: "2026-05-14",
      bbox: [19.05, 72.85, 19.10, 72.90],
      message: "Image successfully registered in GIS spatial database",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid upload request" }, { status: 400 });
  }
}
