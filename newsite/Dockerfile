FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install server dependencies
COPY server/package*.json server/
RUN cd server \
 && if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Copy repository (static site + server)
COPY . .

ENV NODE_ENV=production \
    PORT=8080 \
    TRUST_PROXY=true

EXPOSE 8080

CMD ["node", "server/src/index.js"]

