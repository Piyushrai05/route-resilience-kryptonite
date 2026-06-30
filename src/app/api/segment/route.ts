import { NextResponse } from "next/server";

export async function POST() {
  // Simulate AI Model Inference delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json({
    success: true,
    metrics: {
      iou: 0.884,
      dice: 0.912,
      recall: 0.895,
      precision: 0.921,
      inferenceTime: 1.42,
    },
    extractedRoadPixels: "4,188,432 px",
    roadLengthKm: 42.6,
    occlusionsCleared: "Clouds: 14%, Shadows: 8%",
    message: "AI Road Segmentation completed. Extracted road vector mask successfully.",
  });
}
