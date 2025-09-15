# -------- Stage 1: Build the static site --------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests first for better caching
COPY package.json package-lock.json* ./
RUN npm ci

# Copy source and build
COPY . .
# (Optional) Pass API base at build time:
#   docker build --build-arg VITE_API_BASE=http://localhost:4000 -t pet-client .
ARG VITE_API_BASE=http://localhost:4000
ENV VITE_API_BASE=${VITE_API_BASE}

RUN npm run build

# -------- Stage 2: Serve with nginx --------
FROM nginx:alpine
# Copy build output to nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# Optional: SPA fallback (uncomment both lines if using React Router)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
