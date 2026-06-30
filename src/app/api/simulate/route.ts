import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const disaster = body.disaster || "flood";
    const intensity = body.intensity !== undefined ? body.intensity : 50;

    // Simulate pathfinding calculations
    await new Promise((resolve) => setTimeout(resolve, 900));

    // Calculate dynamic resilience based on intensity
    const baseResilience = 82.4;
    const impactFactor = disaster === "flood" ? 0.45 : disaster === "closure" ? 0.35 : disaster === "accident" ? 0.20 : 0.15;
    const resilienceIndex = Math.max(15.0, +(baseResilience - (intensity * impactFactor)).toFixed(1));
    const totalDelayPct = Math.round(intensity * impactFactor * 2.5);
    const criticalRoadsCount = Math.round(intensity / 10) + 2;

    // Standard baseline path (Sealink to Ghatkopar)
    const baselinePath = [
      [19.0480, 72.8550], // N6
      [19.0550, 72.8600], // N5
      [19.0680, 72.8700], // N4
      [19.0760, 72.8777], // N1
      [19.0820, 72.8850], // N2
      [19.0900, 72.8900], // N3
    ];

    // Alternative path bypassing N2 & N1 (e.g. via Santa Cruz and Vikhroli)
    const alternativePath = [
      [19.0480, 72.8550], // N6
      [19.0550, 72.8600], // N5
      [19.0680, 72.8700], // N4
      [19.0850, 72.8650], // N10
      [19.0950, 72.8750], // N11
      [19.0980, 72.8820], // N12
      [19.0900, 72.8900], // N3
    ];

    const affectedEdges = disaster === "flood" 
      ? ["E1", "E3"] 
      : disaster === "closure" 
      ? ["E2"] 
      : disaster === "accident" 
      ? ["E4"] 
      : ["E9"];

    const recommendations = [
      {
        title: "Dynamic Rerouting",
        desc: "Divert light vehicular traffic from Western Express Connector to Kalina Flyover (20% travel time saved).",
        priority: "high",
      },
      {
        title: "Infrastructure Reinforcement",
        desc: "Establish portable GIS-guided sandbag walls along the Kurla Flyover underpass.",
        priority: "medium",
      },
      {
        title: "Emergency Evacuation Corridor",
        desc: "Reserve the healed Vikhroli-East link exclusively for disaster response teams.",
        priority: "high",
      }
    ];

    return NextResponse.json({
      success: true,
      disaster,
      intensity,
      result: {
        resilienceIndex,
        totalDelayPct,
        criticalRoadsCount,
        altRoutesFound: 2,
        affectedEdges,
        baselinePath,
        alternativePath,
        recommendations,
      },
      message: `Disaster simulation completed. Network metrics updated for intensity: ${intensity}%.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid simulation inputs" }, { status: 400 });
  }
}
