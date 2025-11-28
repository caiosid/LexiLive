# Base image with Node.js
FROM node:22

# Working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install Expo CLI globally
RUN npm install -g expo-cli

# Install project dependencies
RUN npm install

# Copy the rest of the code
COPY . .

# Create non-root user
RUN useradd -m appuser
USER appuser

# Expose Expo ports
EXPOSE 19000 19001 19002 8081

# Start Expo in LAN mode
CMD ["npx", "expo", "start", "--host", "lan"]
