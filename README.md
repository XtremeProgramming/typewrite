# ✍️ typewrite

A full blog platform built in 30 days — powered by caffeine, commits, and collaboration.

![typewrite logo](./assets/typewrite.png)

## 📝 Project Overview

**typewrite** is a simple, clean blog platform that allows users to sign up, log in, write posts, comment, and manage their profile — all built from scratch by two developers, mentored end-to-end through real-world practices.

This project was built in 1 month by:

- 👨‍💻 Katty – Backend lead
- 🎨 Gustavo – Frontend lead

## 🚀 Features

- User registration and login (JWT-based authentication)
- Profile view and edit
- Create, edit, and delete blog posts
- Comment system under posts
- Full frontend/backend integration
- Deployment-ready with CI/CD in mind
- Basic test coverage and clean code

## 🧰 Tech Stack

| Frontend        | Backend | Database   | Deployment |
| --------------- | ------- | ---------- | ---------- |
| React / Next.js | FastAPI | PostgreSQL | TBD        |

## 📁 Project Structure

- **frontend/**: All frontend (React) code and assets.
- **backend/**: Backend (FastAPI) code and APIs.
- **docker-compose.yml**: Docker Compose setup for both FE and BE services.

## 🚀 Getting Started

### Frontend

If you only need the **frontend** running for local development:

1. **Install Docker** (if you don't have it already).
2. **Navigate to the root of the repo** (where `docker-compose.yml` is).
3. Run the following to start the **frontend** in Docker:

   ```bash
   docker compose up frontend
   ```

This will build the **frontend** Docker container and map it to port `5173` on your local machine. After that, navigate to `http://localhost:5173` to access the frontend.

To stop the frontend container:

```bash
docker compose down
```
