# 🧱 Fullstack Auth App

A authentication system built with NestJS, MongoDB, React, and Docker. Implements secure sign-up/sign-in, JWT-based auth with refresh tokens in httpOnly cookies, frontend served via NGINX, and all services containerized for seamless deployment.

---

## 🚀 Run with Docker (One-liner Setup)

```bash
docker-compose up --build
```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:3000 (proxied at `/api`)  
- MongoDB: Internal via `mongo:27017`

 📦 React app is pre-built and served via NGINX  
 🔁 API requests routed via NGINX reverse proxy under `/api`

---

## 🧪 Run Locally (Without Docker)

### 🛠 Backend (NestJS)

```bash
cd backend
cp .env.example .env
npm install
npm run start:dev
```

> Requires MongoDB running at `mongodb://localhost:27017`

### 🎨 Frontend (React)

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

> Runs at http://localhost:3000  
> Ensure `.env` contains: `VITE_API_URL=http://localhost:5000/api`

### 🗄️ MongoDB Options

#### Option 1: Local MongoDB

```bash
mongod --dbpath /path/to/db
```

Update backend `.env` with:

```
MONGO_URI=mongodb://localhost:27017/auth-app
```

#### Option 2: MongoDB via Docker

```bash
docker run -d --name mongo -p 27017:27017 -v mongo-data:/data/db mongo
```

---

## ✅ What’s Included

This repo meets **all core requirements** in the task PDF:

- 🔐 **Frontend**
  - React + TypeScript + Material UI
  - Sign Up form with:
    - email, name, password
    - Password validation (min 8 chars, includes letter, number, special char)
  - Sign In form
  - Redirects to a **Welcome page** after login
  - Refresh token flow fully integrated
  - Tokens stored in secure **httpOnly cookies**

- 🧠 **Backend**
  - NestJS + MongoDB (Mongoose)
  - Passwords hashed with bcrypt
  - JWT token (access + refresh) strategy
  - Guards + decorators for protected routes
  - Strategy pattern for different loggers
  - Audit logging
  - Swagger API (under `/api`)
  - Modular folder structure

- 🧱 **DevOps**
  - Fully containerized with Docker Compose
  - NGINX serves frontend and proxies backend
  - Linting (ESLint + Prettier), EditorConfig included

---

## 📌 Out of Scope

The following were not implemented due to time constraints:

- ❌ Forgot Password / Email verification flows
- ❌ Google OAuth or social login
- ❌ Role-based access or admin panel
- ❌ CSRF protection and Rate Limiting
- ❌ No advanced CSS design polish
- ❌ Some string literals could be enums/constants (e.g., form type)

---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript + Material UI
- **Backend**: NestJS + MongoDB
- **Auth**: JWT (Access + Refresh) in httpOnly cookies
- **Deployment**: Docker + NGINX reverse proxy
- **Dev Tools**: ESLint, Prettier, Swagger