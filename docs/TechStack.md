# Technology Stack - Route Resilience

Detailed breakdown of tools, libraries, and frameworks powering the Route Resilience dashboard.

---

## Core Framework
*   **Next.js 15 (App Router)**: File-based App Router, React Server Components (RSC), and Serverless API routes.
*   **TypeScript**: Static type-safety across components, charts, and Leaflet overlays.

## UI & Styling
*   **Tailwind CSS v4**: Theme engine configuration for dark/light variables and slate-blue GIS panels.
*   **Lucide React**: Clean vector icon suite.
*   **Framer Motion**: Fluid animations for sidebars, transitions, and slider dividers.

## GIS & Maps
*   **Leaflet**: Primary mapping library for geodetic translations.
*   **React Leaflet**: React hooks and components wrapper around leaflet instances.
*   **Esri World Imagery**: Satellite aerial tiles source.
*   **OpenStreetMap**: Street vector layer tiles source.

## Visualization & Data
*   **Recharts**: Responsive SVG graphs for travel delays and degree bottleneck index.
*   **Zustand**: Store container managing simulation parameters, opacity sliders, and analysis runs history.
*   **TanStack Table**: Structuring records and summary logs.

## Future ML & Backend Services
*   **FastAPI (Python)**: High-performance ASGI microservices server.
*   **PyTorch**: Deep learning semantic segmentation models (ResNet50 U-Net).
*   **NetworkX**: Python library for structural graph mathematical manipulations.
