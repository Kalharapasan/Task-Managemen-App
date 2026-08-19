# 📋 Task Management System - Software Engineering Internship Assessment

> **Company:** Zentryx Innovations  
> **Track:** Track A - Web Application (Full-Stack)  
> **Applicant:** Software Engineering Intern Candidate  

A modern, full-stack Task Management Application built with **Next.js (React)**, **Node.js & Express.js**, and **MongoDB**. The application provides an intuitive 3-column Kanban workflow with real-time search, status filtering, due date management, interactive modal editing, delete confirmation dialogs, and toast notifications.

---

## 🌐 Live Deployment Links

- 🎨 **Frontend Application (Next.js):** [https://task-managemen-app-frontend.vercel.app](https://task-managemen-app-frontend.vercel.app)
- ⚡ **Backend REST API (Express & MongoDB):** [https://task-managemen-app.vercel.app](https://task-managemen-app.vercel.app)

---

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS v4
- **Backend:** Node.js, Express.js (RESTful API)
- **Database:** MongoDB Atlas via Mongoose 8
- **Deployment:** Vercel (Frontend & Backend Serverless Functions)

---

## ✨ Features & Requirements Implemented

### Core Requirements
1. **RESTful API (`Node.js` & `Express.js`):**
   - Manages tasks with all required fields: `Title`, `Description`, `Status` (`Pending`, `In Progress`, `Completed`), and `DueDate`.
   - Comprehensive CRUD endpoints (`GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, `DELETE /api/tasks/:id`).
   - Query filters for `status` and `search` keyword.

2. **Responsive UI (`Next.js`):**
   - **Display:** 3-Column Kanban Board organized by task status.
   - **Add:** Modal form to create new tasks with instant UI updates.
   - **Edit:** Modal form and card controls to update task details & status.
   - **Delete:** Interactive confirmation modal to safely delete tasks.

3. **Bonus Features & UI/UX Design:**
   - Modern Tailwind CSS styling with clean UI and smooth transitions.
   - Toast notification feedback system for API interactions (success/error).
   - Database seeding script (`npm run seed` in backend) for instant demo setup.

---

## 📁 Project Structure

```text
Task-Management-App/
├── backend/                  # Node.js & Express REST API
│   ├── api/
│   │   └── index.js          # Vercel Serverless Function entry point
│   ├── src/
│   │   ├── config/           # MongoDB connection config (db.js)
│   │   ├── controllers/      # Task controller logic (taskController.js)
│   │   ├── models/           # Mongoose task schema (Task.js)
│   │   ├── routes/           # API routes (taskRoutes.js)
│   │   ├── app.js            # Express app & CORS setup
│   │   ├── server.js         # HTTP server (Local development)
│   │   └── seed.js           # CLI Database seeder script
│   ├── vercel.json           # Vercel backend routing config
│   ├── .env.example          # Sample environment variables
│   └── package.json
│
└── frontend/                 # Next.js UI Application
    ├── app/                  # Next.js App Router (pages, layout, globals.css)
    ├── components/           # UI Components
    │   ├── TaskCard.js       # Individual task card component
    │   ├── TaskFormModal.js  # Create & Edit task modal
    │   ├── ConfirmDialog.js  # Delete confirmation dialog
    │   └── Toast.js          # Notification alerts
    ├── lib/                  # Utilities & API wrappers
    │   ├── api.js            # Fetch client for Express backend
    │   └── statusConfig.js   # Kanban column metadata & badges
    ├── .env.example          # Sample environment variables
    └── package.json
```

---

## 📊 Database Schema

### `Task` Schema (`backend/src/models/Task.js`)

| Field | Type | Required | Default | Validation / Constraints |
| :--- | :--- | :--- | :--- | :--- |
| `title` | String | Yes | — | Trimmed, max 120 characters |
| `description` | String | No | `""` | Trimmed, max 2000 characters |
| `status` | String | No | `"Pending"` | Enum: `["Pending", "In Progress", "Completed"]` |
| `dueDate` | Date | Yes | — | Valid ISO Date string |
| `createdAt` | Date | Automatic | `Date.now` | Schema timestamp |
| `updatedAt` | Date | Automatic | `Date.now` | Schema timestamp |

---

## 🛠️ Local Setup & Run Instructions

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **MongoDB:** Local MongoDB (`mongodb://127.0.0.1:27017`) or MongoDB Atlas URI

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file (.env)
cp .env.example .env
```

Configure `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:3000
```

*(Optional) Seed initial demo task data:*
```bash
npm run seed
```

Start the backend dev server:
```bash
npm run dev
# Backend runs at http://localhost:5000
```

### 2. Frontend Setup

Open a new terminal:
```bash
cd frontend

# Install dependencies
npm install

# Create environment file (.env.local)
cp .env.example .env.local
```

Configure `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Start the frontend dev server:
```bash
npm run dev
# Frontend runs at http://localhost:3000
```

---

## 🔌 API Reference

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | None |
| `GET` | `/api/tasks` | Get all tasks | `status` (`Pending` \| `In Progress` \| `Completed`), `search` (text query) |
| `GET` | `/api/tasks/:id` | Get single task | None |
| `POST` | `/api/tasks` | Create new task | None |
| `PUT` | `/api/tasks/:id` | Update task details / status | None |
| `DELETE` | `/api/tasks/:id` | Delete task | None |

### Sample Request & Response (`POST /api/tasks`)

**Request Payload:**
```json
{
  "title": "Build UI Wireframes",
  "description": "Create modern UI designs using Next.js and Tailwind CSS.",
  "status": "In Progress",
  "dueDate": "2026-09-01T00:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "66c3b32c5f2b3c4d5e6f7a8c",
    "title": "Build UI Wireframes",
    "description": "Create modern UI designs using Next.js and Tailwind CSS.",
    "status": "In Progress",
    "dueDate": "2026-09-01T00:00:00.000Z",
    "createdAt": "2026-08-19T22:00:00.000Z",
    "updatedAt": "2026-08-19T22:00:00.000Z"
  }
}
```

---

## 📜 Submission Details

- **Company:** Zentryx Innovations
- **Submission Email:** zentryxinnovation@gmail.com
- **Deadline:** 22 September, 12:00 Midnight
