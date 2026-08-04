# Step 1: Use an official Node.js runtime as base image
FROM node:20-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of backend application source code
COPY . .

# Step 6: Expose the backend port
EXPOSE 8000

# Step 7: Define startup command
CMD ["node", "index.js"]
