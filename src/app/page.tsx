"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  Upload,
  Database,
  TrendingUp,
  AlertTriangle,
  FileText,
  Activity,
  PlusCircle,
  Sparkles,
  CheckCircle,
  XCircle,
  Network,
  Shield,
  Clock,
  ExternalLink,
  Info
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  const {
    selectedDataset,
    setSelectedDataset,
    uploadedFileName,
    isUploading,
    setUploadedImage,
    setIsUploading,
    analyses,
    addAnalysis
  } = useAppStore();

  const [dragActive, setDragActive] = useState(false);

  // Mock upload handler
  const handleFileUpload = async (fileName: string, fileSize: string) => {
    setIsUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: fileName, size: fileSize }),
      });
      const data = await res.json();
      if (data.success) {
        setUploadedImage("mock_base64_data", data.fileName);
        
        // Add to recent analyses list automatically
        addAnalysis({
          id: `AN-${Math.floor(1000 + Math.random() * 9000)}`,
          name: `Manual Upload - ${data.fileName}`,
          date: new Date().toISOString().split("T")[0],
          dataset: data.sensor,
          status: "Completed",
          type: "Image Registration",
          resilienceIndex: 82.4,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      handleFileUpload(file.name, sizeMb);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1) + " MB";
      handleFileUpload(file.name, sizeMb);
    }
  };

  // KPI metadata
  const kpiCards = [
    {
      title: "Extracted Road Length",
      value: "145.2 km",
      sub: "+4.2% since yesterday",
      trend: "up",
      icon: Network,
      color: "text-primary bg-primary/10",
    },
    {
      title: "Isolated Components",
      value: "14 units",
      sub: "-3 components healed today",
      trend: "down",
      icon: AlertTriangle,
      color: "text-warning bg-warning/10",
    },
    {
      title: "Avg Node Centrality",
      value: "2.65 deg",
      sub: "Robust topology density",
      trend: "up",
      icon: Activity,
      color: "text-success bg-success/10",
    },
    {
      title: "Resilience Index",
      value: "82.4%",
      sub: "Scale rating: STABLE",
      trend: "up",
      icon: Shield,
      color: "text-accent bg-accent/10",
    },
  ];

  return (
    <>
      {/* Page Title & Dataset Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="font-heading font-bold text-2xl text-text tracking-tight">GIS Control Dashboard</h1>
          <p className="text-xs text-muted font-body mt-1">
            Analyze, segment, and repair critical road networks beneath heavy vegetation and cloud cover.
          </p>
        </div>

        {/* Dataset Selector */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-muted flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-primary" />
            Active Region:
          </span>
          <select
            id="dataset-select"
            value={selectedDataset}
            onChange={(e) => setSelectedDataset(e.target.value)}
            className="text-xs font-semibold text-text bg-white border border-border rounded-xl px-3 py-2 focus:outline-none focus:border-primary shadow-sm"
          >
            <option value="mumbai_monsoon_2026">Mumbai Monsoon (Sentinel-2, 2026)</option>
            <option value="delhi_ncr_2025">Delhi Ring Road (Sentinel-2, 2025)</option>
            <option value="uttarakhand_landslides_2025">Uttarakhand Hills (Cartosat-3, 2025)</option>
          </select>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary text-white p-6 shadow-lg shadow-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur-sm self-start">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            Antariksh Bharat Hackathon - PS-10
          </div>
          <h2 className="font-heading font-extrabold text-xl md:text-2xl leading-snug">
            Automating Satellite Road Network Extraction & Disaster Healing
          </h2>
          <p className="text-xs text-white/80 font-body leading-relaxed">
            Extracting hidden roads from radar and multi-spectral sensors, generating topological network graphs, and simulating disaster flows using DSU/MST algorithms.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link
            href="/extraction"
            className="px-4 py-2.5 bg-white text-primary rounded-xl font-heading font-bold text-xs hover:bg-slate-50 transition-all shadow-md shadow-black/10"
          >
            Launch AI Extractor
          </Link>
          <Link
            href="/simulation"
            className="px-4 py-2.5 bg-primary-foreground/15 text-white border border-white/20 rounded-xl font-heading font-bold text-xs hover:bg-white/10 transition-all"
          >
            Run Disaster Sim
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-border shadow-sm flex items-center justify-between hover:shadow-md transition-all group">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-muted">{kpi.title}</span>
                <span className="text-xl font-numbers font-bold text-text tracking-tight">{kpi.value}</span>
                <span className="text-[10px] text-muted flex items-center gap-1">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="w-3 h-3 text-success" />
                  ) : (
                    <TrendingUp className="w-3 h-3 text-warning rotate-180" />
                  )}
                  {kpi.sub}
                </span>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.color} shadow-sm group-hover:scale-105 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Upload and Quick Actions Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload satellite Image */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm lg:col-span-2 flex flex-col gap-4">
          <div>
            <h3 className="font-heading font-bold text-sm text-text">Register Satellite Imagery Patch</h3>
            <p className="text-xs text-muted font-body mt-0.5">Upload a GeoTIFF or PNG file to run semantic road segmentation.</p>
          </div>

          <div
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:bg-slate-50"
            }`}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-semibold text-muted">Registering files into GIS Index...</span>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="flex flex-col items-center text-center">
                  <span className="text-xs font-bold text-text">
                    Drag and drop file here, or{" "}
                    <label className="text-primary hover:underline cursor-pointer">
                      browse
                      <input
                        type="file"
                        id="image-file-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                  </span>
                  <span className="text-[10px] text-muted mt-1">Supports GeoTIFF, PNG, JPG (Max 50MB)</span>
                </div>
              </>
            )}
          </div>

          {uploadedFileName && (
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-xl border border-success/20 text-xs">
              <div className="flex items-center gap-2 text-success">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span className="font-semibold">Registered: {uploadedFileName}</span>
              </div>
              <button
                onClick={() => setUploadedImage(null, null)}
                className="text-[10px] font-bold text-muted hover:text-danger"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-4">
          <h3 className="font-heading font-bold text-sm text-text">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-2 flex-1">
            <Link
              href="/extraction"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                  AI
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text">Run Extraction Pipeline</span>
                  <span className="text-[10px] text-muted">Segment occluded roads</span>
                </div>
              </div>
              <PlusCircle className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
            </Link>

            <Link
              href="/graph"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-warning/10 text-warning flex items-center justify-center">
                  <Network className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text">Graph MST / DSU Healing</span>
                  <span className="text-[10px] text-muted">Repair disconnected segments</span>
                </div>
              </div>
              <PlusCircle className="w-4 h-4 text-muted group-hover:text-warning transition-colors" />
            </Link>

            <Link
              href="/simulation"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-danger/10 text-danger flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text">Disaster Simulation</span>
                  <span className="text-[10px] text-muted">Flood, Landslide, Accidents</span>
                </div>
              </div>
              <PlusCircle className="w-4 h-4 text-muted group-hover:text-danger transition-colors" />
            </Link>

            <Link
              href="/reports"
              className="flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl border border-border hover:border-primary/30 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text">Generate Reports</span>
                  <span className="text-[10px] text-muted">PDF & GeoJSON download</span>
                </div>
              </div>
              <PlusCircle className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Analyses and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table of Analyses */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-text">Recent Analyses</h3>
            <span className="text-[10px] bg-slate-100 text-muted px-2 py-0.5 rounded-full font-numbers font-semibold">
              {analyses.length} total runs
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border/80 text-muted font-semibold">
                  <th className="pb-3 pl-2">ID</th>
                  <th className="pb-3">NAME</th>
                  <th className="pb-3">DATE</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">TYPE</th>
                  <th className="pb-3 pr-2 text-right">RESILIENCE</th>
                </tr>
              </thead>
              <tbody>
                {analyses.map((run) => (
                  <tr key={run.id} className="border-b border-border/40 hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pl-2 font-numbers font-semibold text-primary">{run.id}</td>
                    <td className="py-3.5 font-bold text-text">{run.name}</td>
                    <td className="py-3.5 font-numbers text-muted">{run.date}</td>
                    <td className="py-3.5">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          run.status === "Completed"
                            ? "bg-success/10 text-success"
                            : run.status === "Processing"
                            ? "bg-primary/10 text-primary animate-pulse"
                            : "bg-danger/10 text-danger"
                        }`}
                      >
                        {run.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-muted">{run.type}</td>
                    <td className="py-3.5 pr-2 text-right font-numbers font-bold text-text">
                      {run.resilienceIndex > 0 ? `${run.resilienceIndex}%` : "--"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-border p-5 shadow-sm flex flex-col gap-4">
          <h3 className="font-heading font-bold text-sm text-text">Activity Timeline</h3>
          <div className="flex flex-col gap-4 flex-1">
            <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-0.5 before:bg-border last:before:hidden">
              <div className="w-6 h-6 rounded-full bg-success/20 text-success flex items-center justify-center shrink-0 z-10 border border-success/35">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-bold text-text">Road Graph Healing Complete</span>
                <span className="text-muted leading-relaxed font-body">Connected 2 disjoint components in Mumbai region using DSU threshold.</span>
                <span className="text-[10px] text-muted font-numbers flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  15 mins ago
                </span>
              </div>
            </div>

            <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-0.5 before:bg-border last:before:hidden">
              <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center shrink-0 z-10 border border-primary/35">
                <Activity className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-bold text-text">AI Segmentation Inference Run</span>
                <span className="text-muted leading-relaxed font-body">Extracted road mask from Sentinel-2 satellite image with IoU of 0.884.</span>
                <span className="text-[10px] text-muted font-numbers flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  1 hour ago
                </span>
              </div>
            </div>

            <div className="flex gap-3 relative before:absolute before:left-[11px] before:top-6 before:bottom-0 before:w-0.5 before:bg-border last:before:hidden">
              <div className="w-6 h-6 rounded-full bg-slate-100 text-muted flex items-center justify-center shrink-0 z-10 border border-border">
                <Upload className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className="font-bold text-text">Satellite Image Registered</span>
                <span className="text-muted leading-relaxed font-body">GeoTIFF patch registered for Mumbai Region under EPSG:4326.</span>
                <span className="text-[10px] text-muted font-numbers flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" />
                  2 hours ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
