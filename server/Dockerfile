# Use an official Node.js runtime as a base image
FROM node:18.12.1-alpine

# Set the working directory for the server
WORKDIR /app/server

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the server code into the container
COPY ./ .

# Expose the port the app will run on
EXPOSE 3000

# Command to run the server
CMD ["node", "index.js"]
