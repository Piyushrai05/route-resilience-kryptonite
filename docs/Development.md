# Development Guide - Route Resilience

Follow this guide to set up the development workspace, test features, and build components.

---

## Workspace Setup

### Prerequisites
*   **Node.js**: `v18.x` or higher (tested on `v20.x`)
*   **Package Manager**: `npm` or `pnpm`

### Installation Steps
1.  Clone the repository:
    ```bash
    git clone git@github.com:Piyushrai05/route-resilience-kryptonite.git
    cd route-resilience-kryptonite
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch local development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied).

---

## Project Formatting & Coding Guidelines

*   **TypeScript Style**: Maintain strict TypeScript interfaces for all metrics, nodes, and maps states. Avoid `any` castings.
*   **Linting checks**: Fix any warnings prior to checking in codes:
    ```bash
    npm run lint
    ```
*   **Code formatting**: Run Prettier formatting:
    ```bash
    npx prettier --write .
    ```

---

## Design System Tokens
All theme coordinates are managed in `src/app/globals.css` using Tailwind CSS v4 custom variables:
*   `--primary`: `#2563EB` (Primary Slate Blue)
*   `--secondary`: `#1E40AF` (Deep Navy)
*   `--success`: `#22C55E` (Green indicators)
*   `--danger`: `#EF4444` (Emergency nodes)
