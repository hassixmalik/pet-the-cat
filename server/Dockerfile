# -------- Stage 1: Build the server (with TypeScript) --------
FROM node:20-alpine AS build
WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install all dependencies (including devDependencies for tsc)
RUN npm ci

# Copy the rest of your code
COPY . .

# Build TypeScript to JavaScript (output usually goes to /dist)
RUN npm run build


# -------- Stage 2: Run the server --------
FROM node:20-alpine
WORKDIR /app

# Only copy package manifests for reproducible install
COPY package.json package-lock.json* ./

# Install only production dependencies (lighter image)
RUN npm ci --omit=dev

# Copy compiled JS + other needed assets from build stage
COPY --from=build /app/dist ./dist

# If you have .env.example, copy it here (or mount at runtime)
# COPY .env .env

EXPOSE 4000

CMD ["node", "dist/index.js"]
