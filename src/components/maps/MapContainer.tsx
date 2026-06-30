"use client";

import dynamic from "next/dynamic";
import React from "react";

const LazyMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-slate-100 animate-pulse rounded-2xl flex flex-col items-center justify-center border border-border">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-xs font-heading font-semibold text-muted">Loading Geospatial Engine...</span>
      </div>
    </div>
  ),
});

interface MapContainerProps {
  showRoads?: boolean;
  showCriticalNodes?: boolean;
  showHeatmap?: boolean;
  showAlternativeRoutes?: boolean;
  showDisconnectedRoads?: boolean;
}

export default function MapContainer(props: MapContainerProps) {
  return <LazyMapComponent {...props} />;
}
