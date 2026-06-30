# Future Roadmap & Scope - Route Resilience

This document outlines key technical integrations planned for future development.

---

## 1. AI Layer Improvements
*   **Multi-Modal Models**: Combine synthetic aperture radar (SAR) with multi-spectral Sentinel imagery to extract road networks under full cloud occlusion.
*   **Dynamic Loss Functions**: Implement topology-aware loss functions (e.g., Skeleton Recall Loss) to ensure high connectivity in segmentation outputs.

## 2. Satellite & GIS API Integrations
*   **Overpass API (OSM)**: Dynamically fetch real-world road vector lines based on viewport coordinates.
*   **Sentinel Hub API**: Fetch live Sentinel-2 cloud-free mosaics on-the-fly when a user drags the map.
*   **OpenRouteService API**: Access real-world routing engines to run pathfinding against live traffic and calculate actual travel delay percentages.

## 3. Real-Time Collaboration & Cloud
*   **WebSockets Integration**: Establish bi-directional websocket streams between the browser and the FastAPI ML worker to show live progress of segmentation and graph healing (node-by-node).
*   **Cloud Spatial DB**: Connect PostGIS database adapters to easily query node intersection buffers.
