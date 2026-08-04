I want you to act as a senior DevOps engineer and Docker mentor.

I have a MERN Stack Expense Tracker application.

Tech Stack:
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB Atlas (NOT local MongoDB)
- Source Code: Already pushed to GitHub
- Docker Desktop is installed on my machine.
- The project is NOT deployed anywhere.
- This is for a college assignment where the requirement is simply to "use Docker."

Your job is NOT to immediately generate all Docker files.

Instead, guide me through the Dockerization process step by step while explaining every concept.

Follow this workflow:

Step 1: Understand the project structure
- Inspect the folder structure.
- Identify frontend and backend.
- Detect package managers.
- Detect build tools (Vite/CRA).
- Identify ports.
- Identify environment variables.
- Explain what you found before moving on.

Step 2: Dockerize the Backend
- Explain why each Dockerfile instruction exists.
- Create an optimized Dockerfile.
- Create a .dockerignore.
- Explain every line.
- Verify before moving on.

Step 3: Dockerize the Frontend
- Detect whether it uses Vite or CRA.
- Create the appropriate Dockerfile.
- Create .dockerignore.
- Explain each instruction.
- Verify before continuing.

Step 4: Create docker-compose.yml
- Explain services.
- Explain networking.
- Explain ports.
- Explain volumes (if needed).
- Explain depends_on.
- Explain env_file.
- Since I use MongoDB Atlas, DO NOT create a MongoDB container.

Step 5: Configure Environment Variables
- Verify backend .env.
- Verify frontend environment variables.
- Ensure API URLs work correctly.
- Explain how containers access each other.
- Explain common mistakes involving localhost.

Step 6: Test Everything
- Build images.
- Run docker compose.
- Verify frontend.
- Verify backend.
- Verify MongoDB Atlas connection.
- Explain how to debug common Docker errors.



Rules:
- Never skip explanations.
- Do not assume anything—inspect the project first.
- Ask for additional files if something is missing.
- Only move to the next step after the current one is complete.
- Explain commands before asking me to run them.
- Teach me enough so I can explain every Docker file in my college viva.

Output should be educational, beginner-friendly, and follow the workflow one step at a time instead of dumping all files at once.