# Base image with Node.js
FROM node:18

# Working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install the Expo CLI and project dependencies.
RUN npm install -g expo-cli && npm install

# Copy the rest of the code.
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002 8081

# Start Expo in host mode
CMD ["npx", "expo", "start", "--host", "0.0.0.0"]