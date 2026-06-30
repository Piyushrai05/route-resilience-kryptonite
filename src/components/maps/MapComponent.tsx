"use client";

import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, ZoomControl, ScaleControl, useMap } from "react-leaflet";
import { Compass, Maximize2, Map as MapIcon, Sliders, ShieldAlert, Navigation } from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface MapComponentProps {
  showRoads?: boolean;
  showCriticalNodes?: boolean;
  showHeatmap?: boolean;
  showAlternativeRoutes?: boolean;
  showDisconnectedRoads?: boolean;
}

export default function MapComponent({
  showRoads = true,
  showCriticalNodes = true,
  showHeatmap = false,
  showAlternativeRoutes = false,
  showDisconnectedRoads = true,
}: MapComponentProps) {
  const { selectedDisaster, disasterIntensity, disasterCoordinates } = useAppStore();
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 19.0760, lng: 72.8777 });
  const [activeLayer, setActiveLayer] = useState<"satellite" | "streets">("satellite");
  const [measureMode, setMeasureMode] = useState(false);
  const [measurePoints, setMeasurePoints] = useState<L.LatLng[]>([]);
  const [measuredDistance, setMeasuredDistance] = useState<number | null>(null);

  // Nodes dataset
  const nodes = [
    { id: "N1", lat: 19.0760, lng: 72.8777, label: "Mumbai Central Grid", type: "intersection", critical: true },
    { id: "N2", lat: 19.0820, lng: 72.8850, label: "Kurla Flyover Junction", type: "intersection", critical: true },
    { id: "N3", lat: 19.0900, lng: 72.8900, label: "Ghatkopar Arterial", type: "highway", critical: true },
    { id: "N4", lat: 19.0680, lng: 72.8700, label: "BKC Expressway Connector", type: "intersection", critical: true },
    { id: "N5", lat: 19.0550, lng: 72.8600, label: "Bandra Ring Link", type: "highway", critical: false },
    { id: "N6", lat: 19.0480, lng: 72.8550, label: "Worli Sealink Entry", type: "terminal", critical: true },
    { id: "N7", lat: 19.0700, lng: 72.8980, label: "Chembur Arterial", type: "intersection", critical: false },
    { id: "N8", lat: 19.0600, lng: 72.8880, label: "Sion Circle", type: "intersection", critical: true },
    { id: "N9", lat: 19.0400, lng: 72.8750, label: "GTB Nagar Terminal", type: "terminal", critical: false },
    { id: "N10", lat: 19.0850, lng: 72.8650, label: "Santa Cruz Access", type: "highway", critical: false },
    { id: "N11", lat: 19.0950, lng: 72.8750, label: "Vikhroli East Isolated", type: "isolated", critical: false },
    { id: "N12", lat: 19.0980, lng: 72.8820, label: "Powai Bypass Isolated", type: "isolated", critical: false },
  ];

  // Road paths
  const roadEdges = [
    { from: [19.0760, 72.8777], to: [19.0820, 72.8850], name: "Kurla Link Road", critical: true },
    { from: [19.0760, 72.8777], to: [19.0680, 72.8700], name: "BKC Road", critical: true },
    { from: [19.0760, 72.8777], to: [19.0600, 72.8880], name: "LBS Marg Connector", critical: false },
    { from: [19.0820, 72.8850], to: [19.0900, 72.8900], name: "Eastern Express Highway", critical: true },
    { from: [19.0680, 72.8700], to: [19.0550, 72.8600], name: "Western Express Connector", critical: false },
    { from: [19.0550, 72.8600], to: [19.0480, 72.8550], name: "Sealink Access Expressway", critical: true },
    { from: [19.0700, 72.8980], to: [19.0600, 72.8880], name: "Sion-Panvel Highway", critical: false },
    { from: [19.0600, 72.8880], to: [19.0400, 72.8750], name: "Sion Terminus Link", critical: false },
    { from: [19.0680, 72.8700], to: [19.0850, 72.8650], name: "Santacruz-Chembur Link Road", critical: false },
    { from: [19.0850, 72.8650], to: [19.0820, 72.8850], name: "Kalina Flyover", critical: false },
  ];

  // Isolated Roads
  const disconnectedEdges = [
    { from: [19.0950, 72.8750], to: [19.0980, 72.8820], name: "Isolated Quarry Road" }
  ];

  // Alternate route path lines (Bypassing Kurla/Sion flood zone)
  const baselinePath = [
    [19.0480, 72.8550],
    [19.0550, 72.8600],
    [19.0680, 72.8700],
    [19.0760, 72.8777],
    [19.0820, 72.8850],
    [19.0900, 72.8900]
  ];

  const alternativePath = [
    [19.0480, 72.8550],
    [19.0550, 72.8600],
    [19.0680, 72.8700],
    [19.0850, 72.8650],
    [19.0950, 72.8750],
    [19.0980, 72.8820],
    [19.0900, 72.8900]
  ];

  // Healed links (Rendered as orange dotted lines)
  const healedEdges = [
    { from: [19.0850, 72.8650], to: [19.0950, 72.8750], name: "AI Healed Link A" },
    { from: [19.0820, 72.8850], to: [19.0980, 72.8820], name: "AI Healed Link B" }
  ];

  // Custom marker generator using L.divIcon
  const createMarkerIcon = (type: string, isCritical: boolean) => {
    let color = "bg-primary border-white";
    let pulse = "";
    
    if (type === "isolated") {
      color = "bg-slate-400 border-slate-600";
    } else if (isCritical) {
      color = "bg-danger border-white";
      pulse = "animate-ping opacity-75 absolute inline-flex h-full w-full rounded-full bg-danger";
    }

    return L.divIcon({
      html: `
        <div class="relative flex items-center justify-center w-5 h-5">
          ${pulse ? `<span class="${pulse}"></span>` : ""}
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 ${color} border-2 shadow-md"></span>
        </div>
      `,
      className: "custom-leaflet-icon",
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  };

  // Custom Map events tracker for coordinates on hover
  const MapEventsTracker = () => {
    const map = useMap();
    useEffect(() => {
      const onMouseMove = (e: L.LeafletMouseEvent) => {
        setCoords({ lat: +e.latlng.lat.toFixed(6), lng: +e.latlng.lng.toFixed(6) });
      };

      const onClick = (e: L.LeafletMouseEvent) => {
        if (measureMode) {
          setMeasurePoints((prev) => {
            const updated = [...prev, e.latlng];
            if (updated.length > 1) {
              let dist = 0;
              for (let i = 0; i < updated.length - 1; i++) {
                dist += updated[i].distanceTo(updated[i + 1]);
              }
              setMeasuredDistance(+(dist / 1000).toFixed(2)); // in km
            }
            return updated;
          });
        }
      };

      map.on("mousemove", onMouseMove);
      map.on("click", onClick);

      return () => {
        map.off("mousemove", onMouseMove);
        map.off("click", onClick);
      };
    }, [map]);

    return null;
  };

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border bg-slate-100 flex flex-col shadow-sm">
      {/* Interactive Map */}
      <div className="flex-1 w-full relative">
        <MapContainer
          center={[19.0760, 72.8777]}
          zoom={13}
          zoomControl={false}
          className="w-full h-full"
        >
          <MapEventsTracker />

          {/* Layer switcher logic */}
          {activeLayer === "satellite" ? (
            <TileLayer
              attribution="Esri World Imagery"
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}

          {/* Render regular roads */}
          {showRoads &&
            roadEdges.map((edge, index) => (
              <Polyline
                key={index}
                positions={[edge.from as [number, number], edge.to as [number, number]]}
                pathOptions={{
                  color: edge.critical ? "#3b82f6" : "#475569",
                  weight: edge.critical ? 4.5 : 3,
                  opacity: 0.8,
                }}
              />
            ))}

          {/* Render Disconnected/Isolated segments */}
          {showDisconnectedRoads &&
            disconnectedEdges.map((edge, index) => (
              <Polyline
                key={index}
                positions={[edge.from as [number, number], edge.to as [number, number]]}
                pathOptions={{
                  color: "#e2e8f0",
                  weight: 3.5,
                  dashArray: "6,6",
                  opacity: 0.9,
                }}
              />
            ))}

          {/* Render Healed Segments */}
          {showDisconnectedRoads &&
            healedEdges.map((edge, index) => (
              <Polyline
                key={index}
                positions={[edge.from as [number, number], edge.to as [number, number]]}
                pathOptions={{
                  color: "#f97316", // orange
                  weight: 4,
                  dashArray: "5, 5",
                  opacity: 0.9,
                }}
              />
            ))}

          {/* Render Alternative & Baseline routes (Simulation) */}
          {showAlternativeRoutes && selectedDisaster && (
            <>
              {/* Baseline Path - red dashed indicating blockage */}
              <Polyline
                positions={baselinePath as [number, number][]}
                pathOptions={{
                  color: "#ef4444",
                  weight: 5,
                  opacity: 0.7,
                  dashArray: "8, 8",
                }}
              />
              {/* Alternative route - thick success green line */}
              <Polyline
                positions={alternativePath as [number, number][]}
                pathOptions={{
                  color: "#22c55e",
                  weight: 6,
                  opacity: 0.9,
                }}
              />
            </>
          )}

          {/* Render heatmap representation if active */}
          {showHeatmap &&
            nodes
              .filter((n) => n.critical)
              .map((node, index) => (
                <Circle
                  key={index}
                  center={[node.lat, node.lng]}
                  radius={500}
                  pathOptions={{
                    fillColor: "#ef4444",
                    fillOpacity: 0.25,
                    color: "transparent",
                  }}
                />
              ))}

          {/* Render disaster area circle */}
          {selectedDisaster && disasterCoordinates && (
            <Circle
              center={disasterCoordinates}
              radius={disasterIntensity * 10} // dynamic radius
              pathOptions={{
                fillColor: "#ef4444",
                fillOpacity: 0.35,
                color: "#ef4444",
                weight: 1.5,
                dashArray: "4,4",
              }}
            />
          )}

          {/* Render critical & non-critical nodes */}
          {showCriticalNodes &&
            nodes.map((node) => (
              <Marker
                key={node.id}
                position={[node.lat, node.lng]}
                icon={createMarkerIcon(node.type, node.critical)}
              >
                <Popup className="custom-popup">
                  <div className="p-2 select-none">
                    <span className="font-heading font-bold text-xs text-text block mb-1">{node.label}</span>
                    <div className="flex flex-col gap-0.5 text-[10px] text-muted font-numbers">
                      <span>ID: {node.id}</span>
                      <span>Type: <span className="capitalize">{node.type}</span></span>
                      <span>Coordinates: {node.lat.toFixed(4)}, {node.lng.toFixed(4)}</span>
                      {node.critical && (
                        <span className="text-danger font-semibold flex items-center gap-1 mt-1">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          High Centrality Bottleneck
                        </span>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}

          {/* Measure Points Renderer */}
          {measureMode && measurePoints.length > 0 && (
            <>
              {measurePoints.map((pt, i) => (
                <Circle
                  key={i}
                  center={pt}
                  radius={10}
                  pathOptions={{ color: "#2563eb", fillColor: "#2563eb", fillOpacity: 1 }}
                />
              ))}
              {measurePoints.length > 1 && (
                <Polyline
                  positions={measurePoints}
                  pathOptions={{ color: "#2563eb", weight: 3, dashArray: "4,4" }}
                />
              )}
            </>
          )}

          {/* standard leaflet components */}
          <ZoomControl position="topleft" />
          <ScaleControl position="bottomleft" />
        </MapContainer>

        {/* Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000] select-none">
          {/* Layer switcher */}
          <div className="flex bg-white rounded-xl shadow-lg border border-border p-1">
            <button
              onClick={() => setActiveLayer("satellite")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeLayer === "satellite" ? "bg-primary text-white" : "text-muted hover:bg-slate-50"
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Satellite</span>
            </button>
            <button
              onClick={() => setActiveLayer("streets")}
              className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeLayer === "streets" ? "bg-primary text-white" : "text-muted hover:bg-slate-50"
              }`}
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Streets</span>
            </button>
          </div>

          {/* Measure Tool */}
          <button
            onClick={() => {
              setMeasureMode(!measureMode);
              if (measureMode) {
                setMeasurePoints([]);
                setMeasuredDistance(null);
              }
            }}
            className={`p-2.5 bg-white rounded-xl shadow-lg border border-border font-semibold text-xs flex items-center justify-center gap-2 hover:bg-slate-50 transition-all ${
              measureMode ? "border-primary text-primary" : "text-text"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>{measureMode ? "Cancel Measure" : "Measure Distance"}</span>
          </button>

          {measureMode && measuredDistance !== null && (
            <div className="bg-slate-900/90 text-white rounded-xl p-3 shadow-lg border border-slate-700 text-xs font-numbers flex flex-col gap-0.5 max-w-xs">
              <span className="text-[10px] text-slate-400">MEASURED DISTANCE</span>
              <span className="text-sm font-bold text-accent">{measuredDistance} km</span>
              <span className="text-[9px] text-slate-500">Click points on map to accumulate distance</span>
            </div>
          )}
        </div>

        {/* Live Coordinates display overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur text-white px-3 py-1.5 rounded-xl border border-slate-800 text-[10px] font-numbers shadow z-[1000] flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-accent animate-spin" style={{ animationDuration: "10s" }} />
            <span>WGS-84</span>
          </div>
          <span>LAT: {coords.lat.toFixed(6)}</span>
          <span>LNG: {coords.lng.toFixed(6)}</span>
        </div>
      </div>
    </div>
  );
}
