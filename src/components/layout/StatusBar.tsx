"use client";

import React from "react";
import { Cpu, Database, RefreshCw, Compass } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

export default function StatusBar() {
  const { selectedDataset } = useAppStore();

  return (
    <footer className="h-8 bg-slate-900 border-t border-slate-800 text-slate-400 flex items-center justify-between px-4 text-[10px] font-numbers select-none shrink-0 z-40">
      {/* Active Source */}
      <div className="flex items-center gap-2">
        <Database className="w-3.5 h-3.5 text-primary" />
        <span>SOURCE:</span>
        <span className="text-white font-semibold uppercase">{selectedDataset.replace(/_/g, " ")}</span>
      </div>

      {/* Middle Stats - GIS Projections */}
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1.5 border-r border-slate-800 pr-4">
          <Compass className="w-3.5 h-3.5 text-accent" />
          <span>PROJECTION:</span>
          <span className="text-white font-semibold">EPSG:4326 (WGS 84)</span>
        </div>
        <div className="flex items-center gap-1.5 border-r border-slate-800 pr-4">
          <span>CENTER:</span>
          <span className="text-white font-semibold">19.0760° N, 72.8777° E</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>TILES:</span>
          <span className="text-white font-semibold">ESRI WORLD IMAGERY</span>
        </div>
      </div>

      {/* Status Indicators */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 border-r border-slate-800 pr-4">
          <Cpu className="w-3.5 h-3.5 text-success" />
          <span>LATENCY:</span>
          <span className="text-success font-semibold">48ms</span>
        </div>
        <div className="flex items-center gap-1">
          <RefreshCw className="w-3 h-3 text-slate-500 animate-spin" style={{ animationDuration: "4s" }} />
          <span>SYNC: OK</span>
        </div>
      </div>
    </footer>
  );
}
