# Dockerization Guide & Viva Preparation - MERN Expense Tracker

This document serves as a complete step-by-step guide and viva study sheet for containerizing the MERN Stack Expense Tracker application.

---

## Step 1: Project Structure & Environment Analysis

### 1. Architecture Overview
* **Frontend**: React 19 + Vite (located in root directory).
* **Backend**: Node.js + Express 5 (located in `backend/` directory).
* **Database**: Remote MongoDB Atlas (Cloud database over network; no local MongoDB container required).
* **Package Manager**: `npm` (`package-lock.json` present in root and backend).

### 2. Ports & Networking
* **Backend Port**: `8000` (`process.env.PORT || 8000`).
* **Frontend Port**: `5173` (Vite dev server default).
* **CORS Setting**: Configured in `backend/index.js` allowing `http://localhost:5173`.
* **API Base URL**: Configured in `src/utils/url.js` pointing to `http://localhost:8000/api/v1`.

### 🎓 Viva Key Takeaway for Step 1
* **Why separate frontend and backend Docker containers?**
  Frontend and Backend have different runtimes, dependencies, build steps, and scaling requirements. Separating them adheres to the **Single Responsibility Principle** of containerization.

---

## Step 2: Dockerizing the Backend

### Files Created
1. `backend/.dockerignore`
2. `backend/Dockerfile`

### 1. `backend/.dockerignore`
```text
node_modules
npm-debug.log
.env
.git
.gitignore
```
* **Why exclude `node_modules`?** Local `node_modules` are built for host OS (Windows). Copying them into Alpine Linux can break native C/C++ bindings (e.g. `bcrypt`).
* **Why exclude `.env`?** Prevents sensitive credentials and API keys from leaking into baked container images.

### 2. `backend/Dockerfile` Breakdown
```dockerfile
# Step 1: Minimal Linux image with Node.js 20
FROM node:20-alpine

# Step 2: Working directory inside container
WORKDIR /app

# Step 3: Copy package files first for layer caching
COPY package*.json ./

# Step 4: Install dependencies inside container
RUN npm install

# Step 5: Copy application source code
COPY . .

# Step 6: Expose backend port
EXPOSE 8000

# Step 7: Container runtime startup command
CMD ["node", "index.js"]
```

### 🎓 Viva Concept: Docker Layer Caching
* **Question**: Why copy `package*.json` and run `npm install` BEFORE `COPY . .`?
* **Answer**: Docker caches build instructions as immutable layers. Dependencies (`package.json`) change far less frequently than source code. By isolating dependency installation, Docker reuses the cached `npm install` layer during rebuilds, saving time and bandwidth.

---

## Step 3: Dockerizing the Frontend (React + Vite)

### Files Created
1. `.dockerignore` (Root)
2. `Dockerfile` (Root)

### 1. `.dockerignore` (Root)
```text
node_modules
dist
npm-debug.log
.git
.gitignore
```
* **Why exclude `dist`?** Excludes previous build artifacts to prevent stale static assets from getting copied.

### 2. `Dockerfile` (Root) Breakdown
```dockerfile
# Step 1: Base Node.js image
FROM node:20-alpine

# Step 2: Working directory inside container
WORKDIR /app

# Step 3: Copy package files for caching
COPY package*.json ./

# Step 4: Install frontend dependencies
RUN npm install

# Step 5: Copy frontend source code
COPY . .

# Step 6: Expose Vite port
EXPOSE 5173

# Step 7: Start Vite with host 0.0.0.0 flag
CMD ["npm", "run", "dev", "--", "--host"]
```

### 🎓 Viva Concept: Why `--host` (`0.0.0.0`) in Vite?
* **Question**: Why do we pass `--host` to Vite when running in Docker?
* **Answer**: By default, Vite binds to `127.0.0.1` (localhost INSIDE the container). In a container environment, `127.0.0.1` is isolated from the host machine. Passing `--host` (binding to `0.0.0.0`) makes Vite listen on all network interfaces inside the container so that your host computer's browser can access `http://localhost:5173`.

---

## Step 4: Docker Compose Orchestration

### File Created
* `docker-compose.yml` (Root)

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: expense-backend
    ports:
      - "8000:8000"
    restart: unless-stopped

  frontend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: expense-frontend
    ports:
      - "5173:5173"
    depends_on:
      - backend
    restart: unless-stopped
```

---

## Step 5: Environment Variables & Networking

### 1. Client-Side (React Browser) vs Container Networking
* **Frontend Execution Location**: Even though React static files are served from inside the `expense-frontend` container, the JavaScript code runs in the user's **web browser** on the host machine.
* **API Base URL**: Because code runs in the host browser, `src/utils/url.js` calls `http://localhost:8000/api/v1`.
* **Port Forwarding**: Docker Compose maps host port `8000` -> container port `8000`, so the browser requests seamlessly reach the Express backend container.

### 🎓 Critical Viva Question: The `localhost` Misconception
> **Question**: Should React frontend in Docker call `http://backend:8000` or `http://localhost:8000`?
>
> **Answer**:
> * `http://backend:8000` works for **server-to-server** communication inside the Docker network (e.g. Node.js server to Python server).
> * `http://localhost:8000` is required for **React Single Page Applications (SPAs)** because the HTTP request originates from the **client browser** outside Docker! The browser does not recognize Docker internal DNS names like `backend`.

---

## Step 6: Testing & Debugging Workflow

### 1. Launching Stack with Docker Compose
```powershell
docker compose up --build -d
```
* `--build`: Forces rebuilding container images if files changed.
* `-d`: Detached mode (runs containers in the background).

### 2. Checking Status of Containers
```powershell
docker ps
```
Shows container status, IDs, names (`expense-frontend`, `expense-backend`), and mapped ports (`5173->5173`, `8000->8000`).

### 3. Inspecting Logs
```powershell
docker logs expense-backend
docker logs expense-frontend
```

### 🎓 Real-World Debugging Case Study: Windows vs Linux Case Sensitivity
* **Symptom**: Backend crashed inside container with `MODULE_NOT_FOUND: Cannot find module '../controllers/TransactionCtrl'`.
* **Root Cause**: Windows filesystems are case-insensitive (`TransactionCtrl.js` matches `transactionCtrl.js`). Linux filesystems inside Docker (`Alpine Linux`) are strictly **case-sensitive**.
* **Fix**: Updated `require("../controllers/TransactionCtrl")` to `require("../controllers/transactionCtrl")`.

### 4. Stopping Containers
```powershell
docker compose down
```

---
