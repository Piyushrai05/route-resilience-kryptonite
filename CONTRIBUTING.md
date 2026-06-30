# Contributing to Route Resilience

First off, thank you for considering contributing to **Route Resilience**! It is people like you who make this platform a powerful open-source solution for disaster planners and GIS specialists.

## Code of Conduct

By participating in this project, you are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs
* Check the existing issues log to see if the bug has already been reported.
* Open a new issue with a clear title, description, steps to reproduce, and screenshots if applicable.

### Suggesting Enhancements
* Check the roadmap in the README for current plans.
* Open a feature request issue explaining the proposal and its benefits.

### Pull Requests
1. Fork the repository and create a new branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```
2. Write modular, clean TypeScript code.
3. Ensure no linting errors:
   ```bash
   npm run lint
   ```
4. Verify the production build compiles successfully:
   ```bash
   npm run build
   ```
5. Commit using the [Conventional Commits](https://www.conventionalcommits.org/) standards.
6. Push to your branch and submit a PR to `main`.

## Coding Style
* Follow `.prettierrc` formatting styles.
* Write structured, functional components in React.
* Keep state parameters in Zustand store clean and documented.
