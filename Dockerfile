# Base Node image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy root and subpackage definitions
COPY package.json ./
COPY client/package.json ./client/
COPY server/package.json ./server/

# Install dependencies
RUN npm install
RUN npm install --prefix client
RUN npm install --prefix server

# Copy source code
COPY . .

# Build client
RUN npm run build:client

# Production image
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/dist ./client/dist

EXPOSE 5000

CMD ["node", "server/index.js"]
