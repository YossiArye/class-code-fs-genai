# 1. Start FROM a base image that already has Node.js installed (Linux + Node 22)
FROM node:22-alpine

# 2. All following commands run inside this folder (inside the image)
WORKDIR /app

# 3. Copy ONLY package files first -> Docker caches the "npm ci" layer.
#    If you change only your code (not package.json), install is skipped. Fast rebuilds!
COPY package*.json ./

# 4. Install production dependencies (runs ONCE, while BUILDING the image)
RUN npm ci --omit=dev

# 5. Now copy the rest of the source code
COPY . .

# 6. Documentation: "this app listens on port 3000" (does NOT publish the port)
EXPOSE 3000

# 7. The command that runs when a CONTAINER starts (not during build)
CMD ["node", "index.js"]
