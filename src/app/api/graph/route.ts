import { NextResponse } from "next/server";

export async function GET() {
  const nodes = [
    { id: "N1", lat: 19.0760, lng: 72.8777, label: "Mumbai Central Grid", type: "intersection" },
    { id: "N2", lat: 19.0820, lng: 72.8850, label: "Kurla Flyover Junction", type: "intersection" },
    { id: "N3", lat: 19.0900, lng: 72.8900, label: "Ghatkopar Arterial", type: "highway" },
    { id: "N4", lat: 19.0680, lng: 72.8700, label: "BKC Expressway Connector", type: "intersection" },
    { id: "N5", lat: 19.0550, lng: 72.8600, label: "Bandra Ring Link", type: "highway" },
    { id: "N6", lat: 19.0480, lng: 72.8550, label: "Worli Sealink Entry", type: "terminal" },
    { id: "N7", lat: 19.0700, lng: 72.8980, label: "Chembur Arterial", type: "intersection" },
    { id: "N8", lat: 19.0600, lng: 72.8880, label: "Sion Circle", type: "intersection" },
    { id: "N9", lat: 19.0400, lng: 72.8750, label: "GTB Nagar Terminal", type: "terminal" },
    { id: "N10", lat: 19.0850, lng: 72.8650, label: "Santa Cruz Access", type: "highway" },
    // Disjoint components (requiring healing)
    { id: "N11", lat: 19.0950, lng: 72.8750, label: "Vikhroli East Isolated", type: "isolated" },
    { id: "N12", lat: 19.0980, lng: 72.8820, label: "Powai Bypass Isolated", type: "isolated" },
  ];

  const edges = [
    { id: "E1", from: "N1", to: "N2", weight: 1.2, name: "Kurla Link Road", critical: true },
    { id: "E2", from: "N1", to: "N4", weight: 1.5, name: "BKC Road", critical: true },
    { id: "E3", from: "N1", to: "N8", weight: 2.1, name: "LBS Marg Connector", critical: false },
    { id: "E4", from: "N2", to: "N3", weight: 1.8, name: "Eastern Express Highway", critical: true },
    { id: "E5", from: "N4", to: "N5", weight: 1.6, name: "Western Express Connector", critical: false },
    { id: "E6", from: "N5", to: "N6", weight: 0.9, name: "Sealink Access Expressway", critical: true },
    { id: "E7", from: "N7", to: "N8", weight: 2.3, name: "Sion-Panvel Highway", critical: false },
    { id: "E8", from: "N8", to: "N9", weight: 2.5, name: "Sion Terminus Link", critical: false },
    { id: "E9", from: "N4", to: "N10", weight: 2.0, name: "Santacruz-Chembur Link Road", critical: false },
    { id: "E10", from: "N10", to: "N2", weight: 1.1, name: "Kalina Flyover", critical: false },
    // Disjoint edge
    { id: "E11", from: "N11", to: "N12", weight: 0.8, name: "Isolated Quarry Road", critical: false },
  ];

  return NextResponse.json({ success: true, nodes, edges });
}
