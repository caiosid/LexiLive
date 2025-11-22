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

# It displays the doors used by the Expo.
EXPOSE 19000 19001 19002

# Defines the default command when starting the container.
CMD ["npm", "start"]