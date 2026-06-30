"use client";

import React, { useState } from "react";
import {
  FileText,
  Download,
  Printer,
  History,
  Activity,
  Shield,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  Info,
  CheckCircle2,
  Share2
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function ReportsPage() {
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // Radar chart data comparing resilience indexes across different scenarios
  const radarData = [
    { subject: "Flooding", baseline: 82, simulated: 37, fullMark: 100 },
    { subject: "Accident", baseline: 82, simulated: 68, fullMark: 100 },
    { subject: "Closure", baseline: 82, simulated: 57, fullMark: 100 },
    { subject: "Metro Const", baseline: 82, simulated: 71, fullMark: 100 },
    { subject: "Baseline", baseline: 82, simulated: 82, fullMark: 100 },
  ];

  // Reports historical logs
  const reportHistory = [
    { id: "REP-9901", title: "Mumbai Eastern Suburbs Monsoon Risk Study", type: "PDF Report", date: "2026-06-30", size: "2.4 MB" },
    { id: "REP-9900", title: "Sion Circle Bottleneck GeoJSON Network", type: "GeoJSON Vector", date: "2026-06-28", size: "840 KB" },
    { id: "REP-9899", title: "Dehradun Landslide Graph Edge Indices", type: "CSV Topology", date: "2026-06-25", size: "120 KB" },
    { id: "REP-9898", title: "Kochi Port Access Path Analysis Report", type: "PDF Report", date: "2026-06-20", size: "3.1 MB" },
  ];

  const handleExport = (type: string) => {
    setIsExporting(type);
    setTimeout(() => {
      setIsExporting(null);
      // Simulate file download by creating a mock link or alert
      const fileExtensions: Record<string, string> = {
        pdf: "route_resilience_mumbai_report.pdf",
        csv: "road_network_metrics_mumbai.csv",
        geojson: "mumbai_road_vectors.geojson"
      };
      
      const link = document.createElement("a");
      link.href = "#";
      link.setAttribute("download", fileExtensions[type] || "report");
      document.body.appendChild(link);
      // Clean trigger
      alert(`Export Success: ${fileExtensions[type]} downloaded successfully.`);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Title Header */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="font-heading font-bold text-2xl text-text tracking-tight">Analytical Reports & Data Exports</h1>
        <p className="text-xs text-muted font-body mt-1">
          Compile GIS analysis summaries, export high-accuracy GeoJSON vector road layouts, download CSV matrices, and generate print-ready PDF briefs.
        </p>
      </div>

      {/* Summary KPI widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-muted uppercase">Reports Compiled</span>
            <span className="text-xl font-numbers font-bold text-text">18 briefs</span>
            <span className="text-[9px] text-muted">All active regions</span>
          </div>
        </div>

        <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
            <History className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-muted uppercase">Last Generated</span>
            <span className="text-xs font-semibold text-text font-heading leading-tight mt-0.5">
              REP-9901 (Today, 10:45 PM)
            </span>
            <span className="text-[9px] text-muted">Mumbai Eastern Freeway</span>
          </div>
        </div>

        <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[10px] font-bold text-muted uppercase">Data Sync Status</span>
            <span className="text-xs font-semibold text-success flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>ISRO-OSM Sync OK</span>
            </span>
            <span className="text-[9px] text-muted">Next batch in 1 hour</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Side: Analytical Breakdown and Download controls */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Main Brief Card ready for PDF Print */}
          <div className="bg-white border border-border p-6 rounded-2xl shadow-sm flex flex-col gap-6 print:border-0 print:shadow-none">
            <div className="flex items-center justify-between border-b border-border/80 pb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-numbers font-bold text-primary tracking-widest uppercase">
                  GIS Platform Summary Brief
                </span>
                <h3 className="font-heading font-extrabold text-base text-text mt-0.5">
                  Mumbai Eastern Freeway & Sion Sector
                </h3>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="p-2 border border-border hover:bg-slate-50 text-text rounded-xl text-xs font-bold font-heading flex items-center gap-1.5 transition-all shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Brief</span>
                </button>
              </div>
            </div>

            {/* Brief content description */}
            <div className="flex flex-col gap-4 text-xs font-body text-text leading-relaxed">
              <p>
                This summary brief evaluates the resilience indices of the Mumbai Metropolitan Region (MMR) road networks following deep learning road extraction. The Sentinel-2 L2A satellite image captured on May 14, 2026, was used as the primary baseline matrix.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
                <div className="p-4 bg-slate-50 border border-border rounded-xl flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-muted uppercase">Baseline Network Summary</span>
                  <div className="flex flex-col gap-1 font-semibold text-text mt-1">
                    <div className="flex justify-between">
                      <span className="text-muted">Extracted road grid</span>
                      <span>145.2 km</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Total Nodes count</span>
                      <span>142 nodes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Average connectivity degree</span>
                      <span>2.65 deg</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-border rounded-xl flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-muted uppercase">Vulnerabilities & Risk Nodes</span>
                  <div className="flex flex-col gap-1 font-semibold text-text mt-1">
                    <div className="flex justify-between">
                      <span className="text-muted">High risk bottlenecks</span>
                      <span className="text-danger">4 intersections</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Disjoint segments resolved</span>
                      <span className="text-success">2 healed links</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted">Min flood resilience index</span>
                      <span className="text-danger">37.4% (Critical)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                <strong>DSU/MST Connectivity Recommendations:</strong> In order to maintain continuous medical transport access under high-intensity flood scenarios, the newly generated AI heuristic link (connecting Santa Cruz access to the Vikhroli eastern bypass) must be structurally consolidated and reserved for emergency response convoys.
              </p>
            </div>

            {/* Export buttons */}
            <div className="border-t border-border/80 pt-5 flex flex-wrap gap-3 print:hidden">
              <button
                id="export-pdf-btn"
                onClick={() => handleExport("pdf")}
                disabled={isExporting !== null}
                className="px-4 py-2.5 bg-primary text-white rounded-xl font-heading font-bold text-xs flex items-center gap-2 hover:bg-secondary shadow-md shadow-primary/10 transition-all active:scale-98 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isExporting === "pdf" ? "Compiling PDF..." : "Export PDF Brief"}</span>
              </button>

              <button
                id="export-geojson-btn"
                onClick={() => handleExport("geojson")}
                disabled={isExporting !== null}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-border text-text rounded-xl font-heading font-bold text-xs flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5 text-muted" />
                <span>{isExporting === "geojson" ? "Extracting..." : "Download GeoJSON"}</span>
              </button>

              <button
                id="export-csv-btn"
                onClick={() => handleExport("csv")}
                disabled={isExporting !== null}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-border text-text rounded-xl font-heading font-bold text-xs flex items-center gap-2 transition-all active:scale-98 disabled:opacity-50"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-muted" />
                <span>{isExporting === "csv" ? "Generating..." : "Download CSV Data"}</span>
              </button>
            </div>
          </div>

          {/* History logs card */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4 print:hidden">
            <h3 className="font-heading font-bold text-sm text-text">Reports Export History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-muted font-semibold">
                    <th className="pb-3 pl-2">REPORT ID</th>
                    <th className="pb-3">TITLE / DATASET</th>
                    <th className="pb-3">FORMAT TYPE</th>
                    <th className="pb-3">GENERATION DATE</th>
                    <th className="pb-3 pr-2 text-right">FILE SIZE</th>
                  </tr>
                </thead>
                <tbody>
                  {reportHistory.map((rep) => (
                    <tr key={rep.id} className="border-b border-border/40 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 pl-2 font-numbers font-semibold text-primary">{rep.id}</td>
                      <td className="py-3.5 font-bold text-text">{rep.title}</td>
                      <td className="py-3.5 font-semibold text-muted">{rep.type}</td>
                      <td className="py-3.5 font-numbers text-muted">{rep.date}</td>
                      <td className="py-3.5 pr-2 text-right font-numbers text-text">{rep.size}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Radar Graph Column (Width: 1/3) */}
        <div className="flex flex-col gap-6 print:hidden">
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-text">Resilience Comparison</h3>
              <Activity className="w-4 h-4 text-primary" />
            </div>

            {/* Radar chart container */}
            <div className="h-64 w-full text-xs font-numbers">
              <span className="text-[10px] font-bold text-muted uppercase block mb-1 font-heading">
                Resilience Index: Baseline vs Simulated
              </span>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#64748b", fontSize: 9 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 9 }} />
                  <Radar name="Baseline Index" dataKey="baseline" stroke="#2563eb" fill="#2563eb" fillOpacity={0.15} />
                  <Radar name="Simulated Index" dataKey="simulated" stroke="#ef4444" fill="#ef4444" fillOpacity={0.25} />
                  <Legend wrapperStyle={{ fontSize: 9 }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3.5 bg-slate-50 border border-border rounded-xl text-xs font-semibold leading-relaxed text-text mt-2">
              <div className="flex items-center gap-1.5 text-danger font-bold mb-1">
                <AlertTriangle className="w-4 h-4" />
                <span>Disaster Impact Delta</span>
              </div>
              <span className="font-body text-muted">
                Flooding represents the largest delta drop (-45 points) compared to standard baseline network resilience, due to key intersection blockages in low-elevation Sion/Kurla corridors.
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
