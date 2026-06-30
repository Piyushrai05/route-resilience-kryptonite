import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    reportId: "REP-2026-MUMBAI",
    generatedAt: new Date().toISOString(),
    networkMetadata: {
      location: "Mumbai Metropolitan Region",
      baselineResilience: 82.4,
      vulnerableSectors: ["Sion", "Kurla West", "Chembur Highway Segment"],
      criticalBottlenecks: 4,
    },
    graphStats: {
      totalRoadsExtractedKm: 145.2,
      modelAccuracy: { iou: 0.88, dice: 0.91 },
      healedSegmentsCount: 2,
    },
    disasterAnalysis: [
      { scenario: "Flood (100-year recurrence)", resilienceScore: 37.4, delayFactor: "220%" },
      { scenario: "Construction Block", resilienceScore: 71.2, delayFactor: "125%" },
      { scenario: "Major Multi-Vehicle Accidentage", resilienceScore: 68.5, delayFactor: "140%" },
      { scenario: "Road Closure (Protest/VIP Movement)", resilienceScore: 57.1, delayFactor: "180%" },
    ],
    geojson: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Mumbai Central Grid Edge", capacity: 8000, status: "stable" },
          geometry: { type: "LineString", coordinates: [[72.8777, 19.0760], [72.8850, 19.0820]] }
        },
        {
          type: "Feature",
          properties: { name: "Kurla Flyover Segment", capacity: 5500, status: "critical" },
          geometry: { type: "LineString", coordinates: [[72.8850, 19.0820], [72.8900, 19.0900]] }
        }
      ]
    }
  });
}
