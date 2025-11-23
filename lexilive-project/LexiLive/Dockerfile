# Base image with Node.js
FROM node:22

# Working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install the Expo CLI and specific versions of expo/react, plus other dependencies
RUN npm install -g expo-cli && \
    npm install expo@~54.0.25 react@19.1.0 && \
    npm install

# Copy the rest of the code
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002 8081

# Start Expo in host mode
CMD ["npx", "expo", "start", "--host", "lan"]
