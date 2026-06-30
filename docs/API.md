# API Documentation - Route Resilience

This document specifies the endpoints, request bodies, and JSON responses for the Route Resilience backend API routes.

---

## 1. Register Satellite Imagery
Register satellite raw imagery into the spatial database.

*   **Endpoint**: `/api/upload`
*   **Method**: `POST`
*   **Request Body**:
    ```json
    {
      "name": "satellite_patch_mumbai.png",
      "size": "14.2 MB"
    }
    ```
*   **Response**:
    ```json
    {
      "success": true,
      "fileName": "satellite_patch_mumbai.png",
      "fileSize": "14.2 MB",
      "dimensions": "4096 x 4096 px",
      "sensor": "Sentinel-2 L2A",
      "captureDate": "2026-05-14",
      "bbox": [19.05, 72.85, 19.1, 72.9],
      "message": "Image successfully registered in GIS spatial database"
    }
    ```

---

## 2. Road Segmentation
Executes the deep learning road network segmentation model.

*   **Endpoint**: `/api/segment`
*   **Method**: `POST`
*   **Response**:
    ```json
    {
      "success": true,
      "metrics": {
        "iou": 0.884,
        "dice": 0.912,
        "recall": 0.895,
        "precision": 0.921,
        "inferenceTime": 1.42
      },
      "extractedRoadPixels": "4,188,432 px",
      "roadLengthKm": 42.6,
      "occlusionsCleared": "Clouds: 14%, Shadows: 8%",
      "message": "AI Road Segmentation completed. Extracted road vector mask successfully."
    }
    ```

---

## 3. Graph Healing
Consolidate disconnected segment subgraphs using MST or DSU algorithms.

*   **Endpoint**: `/api/heal`
*   **Method**: `POST`
*   **Request Body**:
    ```json
    {
      "method": "dsu",
      "threshold": 45,
      "strength": 75
    }
    ```
*   **Response**:
    ```json
    {
      "success": true,
      "method": "dsu",
      "threshold": 45,
      "healedEdges": [
        { "id": "HE1", "from": "N10", "to": "N11", "weight": 1.4, "name": "AI Healed Link A", "healed": true }
      ],
      "metrics": {
        "nodesCount": 142,
        "edgesCount": 190,
        "avgDegree": 2.78,
        "density": 0.021,
        "connectedComponents": 1
      }
    }
    ```

---

## 4. Disaster Simulation
Simulates traffic flow blockage scenarios.

*   **Endpoint**: `/api/simulate`
*   **Method**: `POST`
*   **Request Body**:
    ```json
    {
      "disaster": "flood",
      "intensity": 50
    }
    ```
*   **Response**:
    ```json
    {
      "success": true,
      "disaster": "flood",
      "intensity": 50,
      "result": {
        "resilienceIndex": 59.9,
        "totalDelayPct": 125,
        "criticalRoadsCount": 7,
        "altRoutesFound": 2,
        "affectedEdges": ["E1", "E3"],
        "baselinePath": [[19.048, 72.855], [19.09, 72.89]],
        "alternativePath": [[19.048, 72.855], [19.09, 72.89]],
        "recommendations": [
          { "title": "Dynamic Rerouting", "desc": "Divert traffic...", "priority": "high" }
        ]
      }
    }
    ```
