"use client";

import React, { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  Network,
  Settings,
  Zap,
  TrendingUp,
  Sliders,
  CheckCircle,
  HelpCircle,
  RefreshCw,
  GitCommit,
  GitBranch,
  Shield,
  Activity,
  Layers,
  ArrowRight
} from "lucide-react";

export default function GraphConstructionPage() {
  const {
    healingMethod,
    setHealingMethod,
    edgeThreshold,
    setEdgeThreshold,
    healingStrength,
    setHealingStrength,
    graphMetrics,
    setGraphMetrics,
    isHealing,
    setIsHealing,
    hasHealed,
    setHasHealed,
    addNotification
  } = useAppStore();

  const [pipelineStep, setPipelineStep] = useState<"mask" | "skeleton" | "raw_graph" | "healed_graph">("healed_graph");

  // Call mock graph healing API
  const handleRunHealing = async () => {
    setIsHealing(true);
    setHasHealed(false);
    try {
      const res = await fetch("/api/heal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method: healingMethod, threshold: edgeThreshold, strength: healingStrength }),
      });
      const data = await res.json();
      if (data.success) {
        setGraphMetrics(data.metrics);
        setHasHealed(true);
        addNotification(`Graph healed using ${healingMethod.toUpperCase()}. Connected components consolidated.`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsHealing(false);
    }
  };

  const steps: Array<{
    key: "mask" | "skeleton" | "raw_graph" | "healed_graph";
    label: string;
    desc: string;
  }> = [
    { key: "mask", label: "Road Mask", desc: "Binary Segmentation Overlay" },
    { key: "skeleton", label: "Skeleton", desc: "Medial Axis Thinning" },
    { key: "raw_graph", label: "Road Graph", desc: "Raw Node-Edge Topology" },
    { key: "healed_graph", label: "Healed Graph", desc: "Consolidated Network" },
  ];

  // Critical nodes centrality table
  const centralityNodes = [
    { node: "N1", location: "Sion Junction East", degree: 4, betweenness: "0.842", status: "Critical" },
    { node: "N2", location: "Kurla Bridge Sector", degree: 3, betweenness: "0.765", status: "Critical" },
    { node: "N6", location: "Bandra Reclamation", degree: 3, betweenness: "0.680", status: "Critical" },
    { node: "N8", location: "LBS Marg Access", degree: 3, betweenness: "0.590", status: "Moderate" },
    { node: "N4", location: "BKC Expressway", degree: 2, betweenness: "0.512", status: "Moderate" },
  ];

  return (
    <>
      {/* Title Header */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="font-heading font-bold text-2xl text-text tracking-tight">Graph Construction & Topology Healing</h1>
        <p className="text-xs text-muted font-body mt-1">
          Extract topological skeleton networks from AI segmentation masks and automatically resolve disconnected components using DSU and MST heuristics.
        </p>
      </div>

      {/* Visual Pipeline Pipeline */}
      <div className="bg-white border border-border p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 select-none">
        {steps.map((step, idx) => {
          const isActive = pipelineStep === step.key;
          return (
            <React.Fragment key={step.key}>
              <div
                onClick={() => setPipelineStep(step.key)}
                className={`flex-1 p-3 rounded-xl border text-center transition-all cursor-pointer ${
                  isActive
                    ? "bg-primary/5 border-primary text-primary shadow-sm"
                    : "border-border hover:bg-slate-50 text-muted"
                }`}
              >
                <div className="text-[10px] font-numbers font-bold uppercase tracking-wider mb-1">
                  Step 0{idx + 1}
                </div>
                <div className="text-xs font-bold font-heading text-text">{step.label}</div>
                <div className="text-[9px] text-muted mt-0.5">{step.desc}</div>
              </div>
              {idx < steps.length - 1 && <ArrowRight className="w-4 h-4 text-muted shrink-0 hidden md:block" />}
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Graph Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        {/* Left Side: Parameters and Controls */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          {/* Healing Controls Card */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-text">Graph Healing Engine</h3>
              <Settings className="w-4 h-4 text-muted" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Algorithm selector */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-muted uppercase">Healing Heuristic</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setHealingMethod("dsu")}
                    className={`py-2 px-3 border rounded-xl text-xs font-bold font-heading transition-all ${
                      healingMethod === "dsu"
                        ? "bg-primary border-primary text-white"
                        : "border-border hover:bg-slate-50 text-text"
                    }`}
                  >
                    Disjoint Set Union (DSU)
                  </button>
                  <button
                    onClick={() => setHealingMethod("mst")}
                    className={`py-2 px-3 border rounded-xl text-xs font-bold font-heading transition-all ${
                      healingMethod === "mst"
                        ? "bg-primary border-primary text-white"
                        : "border-border hover:bg-slate-50 text-text"
                    }`}
                  >
                    Minimum Spanning Tree (MST)
                  </button>
                </div>
                <span className="text-[9px] text-muted font-body mt-1 leading-normal">
                  {healingMethod === "dsu"
                    ? "DSU groups disjoint components based on coordinate closeness boundaries and bridges gaps."
                    : "MST creates a minimal connectivity backbone between disconnected centroid components."}
                </span>
              </div>

              {/* Threshold controls */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-text">
                    <span className="text-muted">Edge Distance Threshold</span>
                    <span className="font-numbers">{edgeThreshold}m</span>
                  </div>
                  <input
                    id="threshold-slider"
                    type="range"
                    min="10"
                    max="100"
                    value={edgeThreshold}
                    onChange={(e) => setEdgeThreshold(+e.target.value)}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary mt-1"
                  />
                  <span className="text-[9px] text-muted">Max distance span allowed to connect disjoint components.</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-text">
                    <span className="text-muted">Healing Connection Strength</span>
                    <span className="font-numbers">{healingStrength}%</span>
                  </div>
                  <input
                    id="strength-slider"
                    type="range"
                    min="10"
                    max="100"
                    value={healingStrength}
                    onChange={(e) => setHealingStrength(+e.target.value)}
                    className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary mt-1"
                  />
                  <span className="text-[9px] text-muted">Percentage of heuristics threshold to enforce closure.</span>
                </div>
              </div>
            </div>

            {isHealing ? (
              <button
                disabled
                className="w-full py-3 bg-primary/20 text-primary rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 mt-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Healing Algorithmic Pipeline...</span>
              </button>
            ) : (
              <button
                id="run-healing-btn"
                onClick={handleRunHealing}
                className="w-full py-3 bg-primary hover:bg-secondary text-white rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 mt-2 shadow-md shadow-primary/20 transition-all active:scale-98"
              >
                <Zap className="w-4 h-4 fill-white text-white" />
                <span>Execute Graph Healing</span>
              </button>
            )}
          </div>

          {/* Node Centrality Table */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Topological Centrality Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border/80 text-muted font-semibold">
                    <th className="pb-3 pl-2">NODE ID</th>
                    <th className="pb-3">LOCATION IDENTIFIER</th>
                    <th className="pb-3">DEGREE</th>
                    <th className="pb-3">BETWEENNESS CENTRALITY</th>
                    <th className="pb-3 pr-2 text-right">RISK STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {centralityNodes.map((node) => (
                    <tr key={node.node} className="border-b border-border/40 hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 pl-2 font-numbers font-semibold text-primary">{node.node}</td>
                      <td className="py-3.5 font-bold text-text">{node.location}</td>
                      <td className="py-3.5 font-numbers text-text">{node.degree}</td>
                      <td className="py-3.5 font-numbers text-muted">{node.betweenness}</td>
                      <td className="py-3.5 pr-2 text-right">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            node.status === "Critical"
                              ? "bg-danger/10 text-danger"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {node.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Graph Statistics & Comparison */}
        <div className="flex flex-col gap-6">
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Connectivity Metrics</h3>

            <div className="flex flex-col gap-4">
              {/* Connected components count badge */}
              <div className="p-4 bg-slate-50 rounded-xl border border-border flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted uppercase">Connected Components</span>
                  <span className="text-xl font-numbers font-bold text-text tracking-tight mt-1">
                    {graphMetrics.connectedComponents}
                  </span>
                </div>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${
                    graphMetrics.connectedComponents === 1 ? "bg-success/15 text-success" : "bg-warning/15 text-warning"
                  }`}
                >
                  {graphMetrics.connectedComponents === 1 ? "Fully" : "Disjoint"}
                </div>
              </div>

              {/* Node and Edge count layout */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[9px] font-bold text-muted uppercase">Total Nodes</span>
                  <span className="text-base font-numbers font-bold text-text">{graphMetrics.nodesCount}</span>
                </div>
                <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1 text-center">
                  <span className="text-[9px] font-bold text-muted uppercase">Total Edges</span>
                  <span className="text-base font-numbers font-bold text-text">{graphMetrics.edgesCount}</span>
                </div>
              </div>

              {/* Average degree & Density */}
              <div className="flex flex-col gap-2.5 border-t border-border/60 pt-4 text-xs font-semibold text-text">
                <div className="flex justify-between">
                  <span className="text-muted">Average Node Degree</span>
                  <span className="font-numbers">{graphMetrics.avgDegree}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Graph Topology Density</span>
                  <span className="font-numbers">{graphMetrics.density}</span>
                </div>
              </div>

              {hasHealed && (
                <div className="p-3 bg-success/5 rounded-xl border border-success/20 text-xs text-success flex gap-2 leading-relaxed font-body mt-2">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Healed disjoint subgraphs. Network components integrated successfully, reducing total components.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
