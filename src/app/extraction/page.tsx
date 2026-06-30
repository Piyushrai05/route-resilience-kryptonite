"use client";

import React, { useState, useRef } from "react";
import { useAppStore } from "@/store/useAppStore";
import {
  Cpu,
  Sliders,
  Play,
  CheckCircle,
  Clock,
  Sparkles,
  Search,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronRight,
  RefreshCw,
  SlidersHorizontal,
  ChevronsLeftRight,
  Info
} from "lucide-react";
import Image from "next/image";

export default function ExtractionPage() {
  const {
    isExtracting,
    setIsExtracting,
    extractionMetrics,
    setExtractionMetrics,
    hasExtracted,
    setHasExtracted,
    extractionOpacity,
    setExtractionOpacity,
    sliderPosition,
    setSliderPosition
  } = useAppStore();

  const [zoom, setZoom] = useState(100);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  // Run AI segmentation handler
  const handleRunAI = async () => {
    setIsExtracting(true);
    setHasExtracted(false);
    try {
      const res = await fetch("/api/segment", {
        method: "POST",
      });
      const data = await res.json();
      if (data.success) {
        setExtractionMetrics(data.metrics);
        setHasExtracted(true);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExtracting(false);
    }
  };

  // Slider dragging mechanics
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingSlider || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(Math.round(pct));
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingSlider || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(Math.round(pct));
  };

  // Steps indicator
  const steps = [
    { label: "Image Upload", status: "completed" },
    { label: "AI Extraction", status: isExtracting ? "active" : hasExtracted ? "completed" : "active" },
    { label: "Graph Construction", status: "pending" },
    { label: "Resilience Simulation", status: "pending" },
  ];

  return (
    <>
      {/* Title Header */}
      <div className="border-b border-border/60 pb-5">
        <h1 className="font-heading font-bold text-2xl text-text tracking-tight">AI Road Network Extraction</h1>
        <p className="text-xs text-muted font-body mt-1">
          Perform high-accuracy semantic road segmentation on satellite imagery. Resolve hidden road vectors beneath tree canopies.
        </p>
      </div>

      {/* Stepper Workflow */}
      <div className="bg-white border border-border p-4 rounded-2xl shadow-sm flex items-center justify-between gap-4 overflow-x-auto select-none">
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                step.status === "completed"
                  ? "bg-success text-white"
                  : step.status === "active"
                  ? "bg-primary text-white animate-pulse"
                  : "bg-slate-100 text-muted"
              }`}
            >
              {step.status === "completed" ? "✓" : idx + 1}
            </div>
            <span
              className={`text-xs font-semibold ${
                step.status === "active" ? "text-primary" : step.status === "completed" ? "text-text" : "text-muted"
              }`}
            >
              {step.label}
            </span>
            {idx < steps.length - 1 && <ChevronRight className="w-4 h-4 text-muted shrink-0" />}
          </div>
        ))}
      </div>

      {/* Main Workspace Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Side: Interactive Slider Image Viewer */}
        <div className="xl:col-span-3 bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-text bg-slate-100 px-2 py-1 rounded">Viewport</span>
              <span className="text-xs text-muted">Drag slider to compare raw vs mask</span>
            </div>

            {/* Slider zoom and opacity controls */}
            <div className="flex items-center gap-4 text-xs font-semibold text-text">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-3.5 h-3.5 text-muted" />
                <span>Opacity: {Math.round(extractionOpacity * 100)}%</span>
                <input
                  id="opacity-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={extractionOpacity}
                  onChange={(e) => setExtractionOpacity(+e.target.value)}
                  className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex items-center gap-2 border-l border-border pl-4">
                <button
                  onClick={() => setZoom(Math.max(50, zoom - 25))}
                  className="p-1 hover:bg-slate-100 rounded border border-border"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span>{zoom}%</span>
                <button
                  onClick={() => setZoom(Math.min(200, zoom + 25))}
                  className="p-1 hover:bg-slate-100 rounded border border-border"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Split View Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseUp={() => setIsDraggingSlider(false)}
            onMouseLeave={() => setIsDraggingSlider(false)}
            onTouchMove={handleTouchMove}
            onTouchEnd={() => setIsDraggingSlider(false)}
            className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border bg-slate-900 select-none cursor-ew-resize"
          >
            {/* Base Image (Raw satellite imagery) */}
            <div
              className="absolute inset-0 w-full h-full transition-transform duration-200"
              style={{ transform: `scale(${zoom / 100})` }}
            >
              <Image
                src="/images/raw_satellite_patch.png"
                alt="Raw Satellite"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold font-heading">
                RAW IMAGERY
              </div>
            </div>

            {/* Overlay Image (Glowing road mask) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden transition-transform duration-200"
              style={{
                width: `${sliderPosition}%`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: "left center",
              }}
            >
              <div className="absolute inset-0 w-[1200px] h-[500px]" style={{ width: containerRef.current?.clientWidth || 800 }}>
                <Image
                  src={hasExtracted ? "/images/segmented_road_mask.png" : "/images/raw_satellite_patch.png"}
                  alt="Road Segmented Mask"
                  fill
                  className="object-cover"
                  style={{ opacity: hasExtracted ? extractionOpacity : 0.3 }}
                />
              </div>
              <div className="absolute top-3 right-3 bg-primary/90 backdrop-blur text-white px-2 py-1 rounded text-[10px] font-bold font-heading">
                {hasExtracted ? "AI SEGMENTATION" : "RAW FEED"}
              </div>
            </div>

            {/* Slider Bar Separator Handle */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingSlider(true);
              }}
              onTouchStart={() => setIsDraggingSlider(true)}
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize z-20 flex items-center justify-center"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-xl border-2 border-primary flex items-center justify-center text-primary hover:scale-105 active:scale-95 transition-all">
                <ChevronsLeftRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: AI Inference Controls & Metrics */}
        <div className="flex flex-col gap-6">
          {/* Controls Card */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <h3 className="font-heading font-bold text-sm text-text">Inference Parameters</h3>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase">Model Architecture</span>
                <span className="text-xs font-semibold text-text bg-background border border-border p-2 rounded-xl">
                  DeepRoad-UNet v2.5 (Attention-based ResNet50)
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted uppercase">Threshold confidence</span>
                <span className="text-xs font-semibold text-text flex items-center justify-between">
                  <span>0.65</span>
                  <span className="text-[10px] text-muted">Optimal IoU cutoff</span>
                </span>
              </div>
            </div>

            {isExtracting ? (
              <button
                disabled
                className="w-full py-3 bg-primary/20 text-primary rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Running Segmentation...</span>
              </button>
            ) : (
              <button
                id="run-extraction-btn"
                onClick={handleRunAI}
                className="w-full py-3 bg-primary hover:bg-secondary text-white rounded-xl font-heading font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-primary/20 transition-all active:scale-98"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Run Extraction Pipeline</span>
              </button>
            )}
          </div>

          {/* Metrics Card */}
          <div className="bg-white border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-bold text-sm text-text">Model Performance Metrics</h3>
              <Cpu className="w-4 h-4 text-primary" />
            </div>

            {hasExtracted ? (
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted">mIoU</span>
                    <span className="text-lg font-numbers font-bold text-primary">
                      {Math.round(extractionMetrics.iou * 100)}%
                    </span>
                  </div>
                  <div className="bg-slate-50 border border-border p-3 rounded-xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-muted">Dice F1</span>
                    <span className="text-lg font-numbers font-bold text-success">
                      {Math.round(extractionMetrics.dice * 100)}%
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 border-t border-border/60 pt-3 text-xs font-semibold">
                  <div className="flex justify-between text-text">
                    <span className="text-muted">Recall (Sensitivity)</span>
                    <span className="font-numbers">{Math.round(extractionMetrics.recall * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-text">
                    <span className="text-muted">Precision</span>
                    <span className="font-numbers">{Math.round(extractionMetrics.precision * 100)}%</span>
                  </div>
                  <div className="flex justify-between text-text">
                    <span className="text-muted">Inference Time</span>
                    <span className="font-numbers text-primary">{extractionMetrics.inferenceTime}s</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-slate-50 border border-border flex items-center justify-center text-muted">
                  <Info className="w-5 h-5" />
                </div>
                <span className="text-xs text-muted font-body px-4">
                  Run the pipeline to generate model metrics and load segmentation overlay
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
