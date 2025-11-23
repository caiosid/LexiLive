# Base image with Node.js
FROM node:22

# Working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install Expo CLI globally
RUN npm install -g expo-cli

# Install project dependencies with specific compatible versions
RUN npm install expo@~54.0.25 react@19.1.0

# Copy the rest of the code
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002 8081

# Start Expo in LAN mode (avoids 0.0.0.0 AssertionError)
CMD ["npx", "expo", "start", "--host", "lan"]
