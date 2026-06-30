import { create } from "zustand";

export interface AnalysisRecord {
  id: string;
  name: string;
  date: string;
  dataset: string;
  status: "Completed" | "Processing" | "Failed";
  type: string;
  resilienceIndex: number;
}

export interface MetricData {
  iou: number;
  dice: number;
  recall: number;
  precision: number;
  inferenceTime: number;
}

export interface GraphMetrics {
  nodesCount: number;
  edgesCount: number;
  avgDegree: number;
  density: number;
  connectedComponents: number;
}

export interface SimulationResult {
  resilienceIndex: number;
  totalDelayPct: number;
  criticalRoadsCount: number;
  altRoutesFound: number;
}

interface AppState {
  // Datasets
  selectedDataset: string;
  setSelectedDataset: (dataset: string) => void;
  
  // File Upload
  uploadedImage: string | null;
  uploadedFileName: string | null;
  setUploadedImage: (base64: string | null, name: string | null) => void;
  isUploading: boolean;
  setIsUploading: (val: boolean) => void;

  // AI Extraction State
  extractionOpacity: number;
  setExtractionOpacity: (val: number) => void;
  sliderPosition: number;
  setSliderPosition: (val: number) => void;
  isExtracting: boolean;
  setIsExtracting: (val: boolean) => void;
  extractionMetrics: MetricData;
  setExtractionMetrics: (metrics: MetricData) => void;
  hasExtracted: boolean;
  setHasExtracted: (val: boolean) => void;

  // Graph Healing State
  healingMethod: "mst" | "dsu";
  setHealingMethod: (val: "mst" | "dsu") => void;
  edgeThreshold: number;
  setEdgeThreshold: (val: number) => void;
  healingStrength: number;
  setHealingStrength: (val: number) => void;
  graphMetrics: GraphMetrics;
  setGraphMetrics: (metrics: GraphMetrics) => void;
  isHealing: boolean;
  setIsHealing: (val: boolean) => void;
  hasHealed: boolean;
  setHasHealed: (val: boolean) => void;

  // Simulation State
  selectedDisaster: "flood" | "accident" | "closure" | "construction" | null;
  setSelectedDisaster: (disaster: "flood" | "accident" | "closure" | "construction" | null) => void;
  disasterIntensity: number; // 0 to 100
  setDisasterIntensity: (val: number) => void;
  disasterCoordinates: [number, number] | null;
  setDisasterCoordinates: (coords: [number, number] | null) => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean) => void;
  simulationResult: SimulationResult;
  setSimulationResult: (result: SimulationResult) => void;
  activePathId: string | null;
  setActivePathId: (id: string | null) => void;

  // History & Reports
  analyses: AnalysisRecord[];
  addAnalysis: (record: AnalysisRecord) => void;

  // Notifications
  notifications: Array<{ id: string; text: string; time: string; read: boolean }>;
  addNotification: (text: string) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Datasets
  selectedDataset: "mumbai_monsoon_2026",
  setSelectedDataset: (dataset) => set({ selectedDataset: dataset }),

  // File Upload
  uploadedImage: null,
  uploadedFileName: null,
  setUploadedImage: (base64, name) => set({ uploadedImage: base64, uploadedFileName: name, hasExtracted: false, hasHealed: false }),
  isUploading: false,
  setIsUploading: (val) => set({ isUploading: val }),

  // AI Extraction State
  extractionOpacity: 0.8,
  setExtractionOpacity: (val) => set({ extractionOpacity: val }),
  sliderPosition: 50,
  setSliderPosition: (val) => set({ sliderPosition: val }),
  isExtracting: false,
  setIsExtracting: (val) => set({ isExtracting: val }),
  extractionMetrics: {
    iou: 0.88,
    dice: 0.91,
    recall: 0.89,
    precision: 0.92,
    inferenceTime: 1.45,
  },
  setExtractionMetrics: (metrics) => set({ extractionMetrics: metrics }),
  hasExtracted: false,
  setHasExtracted: (val) => set({ hasExtracted: val }),

  // Graph Healing State
  healingMethod: "dsu",
  setHealingMethod: (val) => set({ healingMethod: val }),
  edgeThreshold: 45,
  setEdgeThreshold: (val) => set({ edgeThreshold: val }),
  healingStrength: 75,
  setHealingStrength: (val) => set({ healingStrength: val }),
  graphMetrics: {
    nodesCount: 142,
    edgesCount: 188,
    avgDegree: 2.65,
    density: 0.018,
    connectedComponents: 14,
  },
  setGraphMetrics: (metrics) => set({ graphMetrics: metrics }),
  isHealing: false,
  setIsHealing: (val) => set({ isHealing: val }),
  hasHealed: false,
  setHasHealed: (val) => set({ hasHealed: val }),

  // Simulation State
  selectedDisaster: null,
  setSelectedDisaster: (disaster) => set({ selectedDisaster: disaster }),
  disasterIntensity: 50,
  setDisasterIntensity: (val) => set({ disasterIntensity: val }),
  disasterCoordinates: [19.076, 72.8777], // default Mumbai coordinates
  setDisasterCoordinates: (coords) => set({ disasterCoordinates: coords }),
  isSimulating: false,
  setIsSimulating: (val) => set({ isSimulating: val }),
  simulationResult: {
    resilienceIndex: 82.4,
    totalDelayPct: 0,
    criticalRoadsCount: 8,
    altRoutesFound: 3,
  },
  setSimulationResult: (result) => set({ simulationResult: result }),
  activePathId: null,
  setActivePathId: (id) => set({ activePathId: id }),

  // Mock History data
  analyses: [
    {
      id: "AN-8893",
      name: "Mumbai Eastern Freeway Bottleneck",
      date: "2026-06-28",
      dataset: "Mumbai Sentinel-2",
      status: "Completed",
      type: "Flood Simulation",
      resilienceIndex: 74.2,
    },
    {
      id: "AN-8892",
      name: "Dehradun Landslide Conn Check",
      date: "2026-06-25",
      dataset: "Sentinel-2 Hill Areas",
      status: "Completed",
      type: "Closure Simulation",
      resilienceIndex: 89.1,
    },
    {
      id: "AN-8891",
      name: "Kochi Port Road Network",
      date: "2026-06-20",
      dataset: "ISRO Cartosat-3",
      status: "Failed",
      type: "Graph Extraction",
      resilienceIndex: 0,
    },
    {
      id: "AN-8890",
      name: "Delhi Ring Road Traffic Bypass",
      date: "2026-06-15",
      dataset: "Delhi Overpass API",
      status: "Completed",
      type: "Accident Simulation",
      resilienceIndex: 61.8,
    },
  ],
  addAnalysis: (record) => set((state) => ({ analyses: [record, ...state.analyses] })),

  // Notifications
  notifications: [
    { id: "1", text: "New road network extracted for Mumbai Eastern Suburbs", time: "5 mins ago", read: false },
    { id: "2", text: "Flood simulation for Sentinel-2 dataset complete", time: "1 hour ago", read: false },
    { id: "3", text: "Graph healing completed: resolved 4 disjoint components", time: "2 hours ago", read: true },
  ],
  addNotification: (text) => set((state) => ({
    notifications: [
      { id: Date.now().toString(), text, time: "Just now", read: false },
      ...state.notifications,
    ]
  })),
  markNotificationsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  }))
}));
