"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import MapContainer from "@/components/maps/MapContainer";
import {
  Flame,
  Shield,
  Activity,
  AlertTriangle,
  Play,
  CheckCircle2,
  ListFilter,
  BarChart2,
  HelpCircle,
  RefreshCw,
  TrendingUp,
  MapPin,
  Car,
  Construction,
  Layers,
  ArrowRight,
  Info
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

export default function SimulationPage() {
  const {
    selectedDisaster,
    setSelectedDisaster,
    disasterIntensity,
    setDisasterIntensity,
    simulationResult,
    setSimulationResult,
    isSimulating,
    setIsSimulating,
    addNotification
  } = useAppStore();

  const [showHeatmap, setShowHeatmap] = useState(false);
  const selectedNode = {
    id: "N2",
    label: "Kurla Flyover Junction",
    degree: 3,
    betweenness: 0.765,
    critical: true,
    location: "Mumbai Eastern Segment"
  };

  // Dynamic simulation handler
  const handleSimulate = async () => {
    if (!selectedDisaster) {
      alert("Please select a disaster type first.");
      return;
    }
    setIsSimulating(true);
    try {
      const res = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disaster: selectedDisaster, intensity: disasterIntensity }),
      });
      const data = await res.json();
      if (data.success) {
        setSimulationResult(data.result);
        addNotification(`Disaster simulation for ${selectedDisaster.toUpperCase()} run successfully. Resilience index: ${data.result.resilienceIndex}%`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  // Mock charts dataset
  const delayData = [
    { intensity: 0, delay: 0 },
    { intensity: 20, delay: 12 },
    { intensity: 40, delay: 28 },
    { intensity: 60, delay: 52 },
    { intensity: 80, delay: 84 },
    { intensity: 100, delay: 120 },
  ];

  const criticalRoadsData = [
    { name: "Kurla Link", bottleneckIndex: 85 },
    { name: "BKC Expressway", bottleneckIndex: 72 },
    { name: "Worli Sealink", bottleneckIndex: 68 },
    { name: "Sion Circle", bottleneckIndex: 92 },
    { name: "LBS Marg", bottleneckIndex: 54 },
  ];

  const disasterTypes: Array<{
    key: "flood" | "accident" | "closure" | "construction";
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    desc: string;
  }> = [
    { key: "flood", label: "Flood Inundation", icon: Activity, desc: "High water coverage on roads" },
    { key: "accident", label: "Accident Blockage", icon: Car, desc: "Major highway congestion crash" },
    { key: "closure", label: "VIP Road Closure", icon: AlertTriangle, desc: "VIP convoy or civil blocking" },
    { key: "construction", label: "Construction Delay", icon: Construction, desc: "Metro construction narrowing" },
  ];

  return (
    <>
      {/* Title Header */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="font-heading font-bold text-2xl text-text tracking-tight">Disaster Simulation & Bottleneck Analysis</h1>
        <p className="text-xs text-muted font-body mt-1">
          Model disaster scenarios (Floods, Landslides, Closures) on the road network graph. Calculate dynamic travel delays and visualize alternative route response pipelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left GIS Map Column (Width: 2/3) */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* Map Viewer Container */}
          <div className="relative h-[550px] w-full bg-white border border-border p-4 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-text bg-slate-100 px-2 py-1 rounded">GIS Map Viewer</span>
                <div className="flex items-center gap-2">
                  <input
                    id="heatmap-toggle"
                    type="checkbox"
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                    className="w-3.5 h-3.5 accent-primary cursor-pointer"
                  />
                  <label htmlFor="heatmap-toggle" className="text-xs font-semibold text-text cursor-pointer select-none">
                    Show Criticality Heatmap
                  </label>
                </div>
              </div>

              {/* Legend overlay link */}
              <div className="flex items-center gap-4 text-[10px] font-bold text-muted font-heading uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-danger inline-block" />
                  <span>Bottleneck Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block" />
                  <span>Standard intersection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-success inline-block animate-pulse" />
                  <span>Alternative route</span>
                </div>
              </div>
            </div>

            {/* Render dynamically imported Leaflet Map */}
            <div className="flex-1 w-full relative">
              <MapContainer
                showRoads={true}
                showCriticalNodes={true}
                showHeatmap={showHeatmap}
                showAlternativeRoutes={true}
                showDisconnectedRoads={true}
              />
            </div>
          </div>

          {/* Selected Node Inspector Panel */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-heading font-bold text-sm text-text">Selected GIS Node Inspector</h3>
              <span className="text-[10px] bg-danger/10 text-danger px-2.5 py-0.5 rounded-full font-bold uppercase">
                {selectedNode.critical ? "Critical Bottleneck" : "Standard Segment"}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
              <div className="flex flex-col gap-0.5">
                <span className="text-muted text-[10px] uppercase font-bold">Node Identifier</span>
                <span className="font-numbers text-primary">{selectedNode.id}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted text-[10px] uppercase font-bold">Intersection Label</span>
                <span className="text-text">{selectedNode.label}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted text-[10px] uppercase font-bold">Topology Degree</span>
                <span className="font-numbers text-text">{selectedNode.degree} connections</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-muted text-[10px] uppercase font-bold">Betweenness Centrality</span>
                <span className="font-numbers text-text">{selectedNode.betweenness}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Controls and Charts Column (Width: 1/3) */}
        <div className="flex flex-col gap-6">
          {/* Simulation setup card */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Simulation Parameters</h3>

            {/* Disaster Picker grid */}
            <div className="grid grid-cols-2 gap-2">
              {disasterTypes.map((dis) => {
                const Icon = dis.icon;
                const isSel = selectedDisaster === dis.key;
                return (
                  <button
                    key={dis.key}
                    onClick={() => setSelectedDisaster(dis.key)}
                    className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                      isSel
                        ? "bg-danger/5 border-danger text-danger shadow-sm"
                        : "border-border hover:bg-slate-50 text-text"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isSel ? "text-danger" : "text-muted"}`} />
                    <span className="text-xs font-bold font-heading">{dis.label}</span>
                    <span className="text-[8px] text-muted leading-tight">{dis.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Intensity slider */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs font-semibold text-text">
                <span className="text-muted">Disaster scale intensity</span>
                <span className="font-numbers font-bold text-danger">{disasterIntensity}%</span>
              </div>
              <input
                id="disaster-intensity-slider"
                type="range"
                min="10"
                max="100"
                value={disasterIntensity}
                onChange={(e) => setDisasterIntensity(+e.target.value)}
                className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-danger mt-1"
              />
              <span className="text-[9px] text-muted">Increasing scale blocks wider topological radii.</span>
            </div>

            {isSimulating ? (
              <button
                disabled
                className="w-full py-3 bg-danger/20 text-danger rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 mt-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Simulating disaster flow paths...</span>
              </button>
            ) : (
              <button
                id="run-simulation-btn"
                onClick={handleSimulate}
                className="w-full py-3 bg-danger hover:bg-red-700 text-white rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 mt-2 shadow-md shadow-danger/20 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-white text-white" />
                <span>Run Disaster Simulation</span>
              </button>
            )}
          </div>

          {/* Simulation Output metrics */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Simulation Outputs</h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1 text-center">
                <span className="text-[9px] font-bold text-muted uppercase">Resilience Index</span>
                <span className="text-lg font-numbers font-bold text-primary">
                  {simulationResult.resilienceIndex}%
                </span>
              </div>
              <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1 text-center">
                <span className="text-[9px] font-bold text-muted uppercase">Traffic Delay Factor</span>
                <span className="text-lg font-numbers font-bold text-warning">
                  +{simulationResult.totalDelayPct}%
                </span>
              </div>
            </div>

            {selectedDisaster && (
              <div className="flex flex-col gap-2.5 border-t border-border/60 pt-4 text-xs font-semibold text-text">
                <div className="flex justify-between">
                  <span className="text-muted">Alternative Routes Found</span>
                  <span className="font-numbers text-success">{simulationResult.altRoutesFound} pathways</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Impacted critical road segments</span>
                  <span className="font-numbers text-danger">{simulationResult.criticalRoadsCount} lines</span>
                </div>
              </div>
            )}
          </div>

          {/* Recharts visualisation graphs */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Simulation Analytical Charts</h3>

            <div className="flex flex-col gap-6">
              {/* Delay trend Line Chart */}
              <div className="h-44 w-full text-xs font-numbers">
                <span className="text-[10px] font-bold text-muted uppercase block mb-2 font-heading">
                  Travel Delay Trend vs Intensity
                </span>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={delayData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="intensity" tick={{ fill: "#64748b" }} />
                    <YAxis tick={{ fill: "#64748b" }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="delay" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bottleneck Index Bar Chart */}
              <div className="h-44 w-full text-xs font-numbers border-t border-border pt-4">
                <span className="text-[10px] font-bold text-muted uppercase block mb-2 font-heading">
                  Bottleneck Centrality Score
                </span>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={criticalRoadsData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: "#64748b" }} />
                    <YAxis tick={{ fill: "#64748b" }} />
                    <Tooltip contentStyle={{ fontSize: 10 }} />
                    <Bar dataKey="bottleneckIndex" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recommendations Support Panel */}
          {selectedDisaster && (
            <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
              <h3 className="font-heading font-bold text-sm text-text">Decision Recommendations</h3>
              <div className="flex flex-col gap-3">
                {simulationResult.resilienceIndex < 70 ? (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex gap-2">
                    <Info className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                    <div className="flex flex-col gap-0.5 text-xs text-danger font-medium">
                      <span className="font-bold">CRITICAL WARNING</span>
                      <span>Resilience index dropped below threshold. Action recommended on alternate bypasses.</span>
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col gap-1 text-xs">
                    <span className="font-bold text-text">1. Emergency Rerouting Link</span>
                    <span className="text-muted leading-relaxed">
                      Deploy temporary steel girder panels near BKC access flyover to bypass Kurla traffic congestion.
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 border border-border rounded-xl flex flex-col gap-1 text-xs">
                    <span className="font-bold text-text">2. Pre-emptive evacuation</span>
                    <span className="text-muted leading-relaxed">
                      Alert disaster squads on Sion circle LBS road segments. Predicted water depth &gt; 1.2 meters.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
