# Deployment Guide - Route Resilience

This guide specifies details for packaging the application inside a Docker container or deploying it to Vercel.

---

## 1. Vercel Cloud Deployment

Route Resilience is fully optimized for single-click deployments on Vercel:

1.  Create a Vercel project and link your GitHub repository.
2.  Choose the **Next.js** framework preset.
3.  Deploy. Vercel automatically compiles serverless mock API routes under `/api/*`.

---

## 2. Docker Containerization

To run the application inside a Docker container locally or on a VPS:

### Create Dockerfile
Create a `Dockerfile` in the root workspace:

```dockerfile
# Step 1: Base image
FROM node:20-alpine AS base

# Step 2: Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Step 3: Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Step 4: Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]
```

### Build & Run Container
```bash
# Build the docker image
docker build -t route-resilience:latest .

# Run the docker container
docker run -p 3000:3000 route-resilience:latest
```
