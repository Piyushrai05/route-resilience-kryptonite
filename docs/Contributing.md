# Contributor Guidelines - Route Resilience

Thank you for contributing to Route Resilience! This guide will help you understand the Pull Request process and codebase standards.

---

## 1. Branch Strategy

We organize development branches using convention prefixes:
*   `feat/` - New feature implementations (e.g., `feat/isochrones-layer`).
*   `fix/` - Defect corrections (e.g., `fix/leaflet-marker-popup-offset`).
*   `docs/` - Documentation additions (e.g., `docs/api-guide`).
*   `refactor/` - Code optimization and cleaning.

---

## 2. Commit Standards

We strictly enforce the **Conventional Commits** specification:
*   **Format**: `<type>(<scope>): <description>`
*   **Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`.
*   **Examples**:
    *   `feat(gis): add openrouteservice integration`
    *   `fix(maps): prevent SSR hydration crashes on window loads`

---

## 3. Pull Request Checklists

Before opening a PR, ensure the following checklist is completed:
1.  **Code Compiles**: Run `npm run build` locally.
2.  **Lint Check**: Confirm `npm run lint` yields no warnings.
3.  **Visual Verification**: Ensure maps and slider views render correctly.
4.  **No Dead Code**: Remove console.logs, commented-out blocks, and unused imports.
