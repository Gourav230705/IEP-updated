# Step 1: Use official Node.js runtime as base image
FROM node:20-alpine

# Step 2: Set working directory inside container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json first for layer caching
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of frontend application code
COPY . .

# Step 6: Expose Vite dev server port
EXPOSE 5173

# Step 7: Run Vite server binding to host 0.0.0.0 for container network accessibility
CMD ["npm", "run", "dev", "--", "--host"]
