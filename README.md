# 📋 Task Management System

A modern, responsive full-stack Kanban task management application built with **Next.js**, **Express.js**, and **MongoDB**. 

Designed for clean productivity, it provides a intuitive 3-column task workflow with real-time search, status filtering, due date management, interactive modal editing, custom confirmation dialogs, and toast notifications.

---

## 🚀 Tech Stack

### Frontend
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router) & [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **State & API:** React Hooks (`useState`, `useEffect`) & Fetch API Wrapper

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (v18+)
- **Framework:** [Express.js](https://expressjs.com/) (RESTful API)
- **Database & ODM:** [MongoDB](https://www.mongodb.com/) via [Mongoose 8](https://mongoosejs.com/)
- **Middleware:** `cors`, `dotenv`

---

## ✨ Features

- 📌 **3-Column Kanban Board:** Organizes tasks across `Pending`, `In Progress`, and `Completed` statuses.
- 🔍 **Real-Time Search & Filtering:** Instant keyword search across task titles and status filter controls.
- ✏️ **Full Task CRUD Operations:**
  - **Create:** Add new tasks with title, description, status, and due date.
  - **Read:** View detailed task information.
  - **Update:** Edit task details or quickly switch status directly from the board cards.
  - **Delete:** Remove tasks with modal confirmation to prevent accidental deletion.
- 🔔 **Toast Feedback System:** Non-intrusive toast notifications for success and error handling.
- 🌱 **Database Seeding:** Included CLI script (`npm run seed`) to quickly populate sample data for testing.
- 🛡️ **Robust Validation & Error Handling:** Mongoose schema validations (max lengths, required fields) and structured API responses.

---

## 📁 Project Structure

```text
Task-Management-App/
├── backend/                  # Node.js / Express REST API
│   ├── src/
│   │   ├── config/           # Database connection configuration (db.js)
│   │   ├── controllers/      # Task controller logic (taskController.js)
│   │   ├── models/           # Mongoose schemas & models (Task.js)
│   │   ├── routes/           # Express API route handlers (taskRoutes.js)
│   │   ├── app.js            # Express application setup & middleware
│   │   ├── server.js         # HTTP server listener entry point
│   │   └── seed.js           # Database seeder script with sample tasks
│   ├── .env.example          # Sample environment configuration for backend
│   └── package.json
│
└── frontend/                 # Next.js UI Application
    ├── app/                  # Next.js App Router (pages, layout, global CSS)
    ├── components/           # UI Components
    │   ├── TaskCard.js       # Individual task card component
    │   ├── TaskFormModal.js  # Create / Edit modal dialog
    │   ├── ConfirmDialog.js  # Delete confirmation dialog
    │   └── Toast.js          # Feedback alert toasts
    ├── lib/                  # Utilities & API wrappers
    │   ├── api.js            # Fetch wrapper for talking to Express backend
    │   └── statusConfig.js   # Kanban status styling & meta configuration
    ├── .env.example          # Sample environment configuration for frontend
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

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js:** v18.0.0 or higher installed (`node -v`)
- **MongoDB:** A local MongoDB instance (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cloud database.

---

### Step 1: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the sample environment file and configure variables:
   ```bash
   cp .env.example .env
   ```

   *Default `.env` settings:*
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/task_manager
   CORS_ORIGIN=http://localhost:3000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. *(Optional)* Seed sample task data:
   ```bash
   npm run seed
   ```

5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The Express backend server will run on `http://localhost:5000`.*

---

### Step 2: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Copy the sample environment file and configure variables:
   ```bash
   cp .env.example .env.local
   ```

   *Default `.env.local` settings:*
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The Next.js app will be accessible at `http://localhost:3000`.*

---

## 🔌 API Reference

### Endpoints

| Method | Endpoint | Description | Query Parameters |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health check | None |
| `GET` | `/api/tasks` | Fetch list of tasks | `status` (`Pending` \| `In Progress` \| `Completed`), `search` (keyword) |
| `GET` | `/api/tasks/:id` | Fetch single task details | None |
| `POST` | `/api/tasks` | Create a new task | None |
| `PUT` | `/api/tasks/:id` | Update an existing task | None |
| `DELETE` | `/api/tasks/:id` | Delete a task | None |

---

### Request & Response Examples

#### 1. Fetch Tasks (`GET /api/tasks`)
**Request:**
```http
GET /api/tasks?status=In%20Progress&search=Design HTTP/1.1
Host: localhost:5000
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "66c3a21b4f1a2c3d4e5f6a7b",
      "title": "Design Dashboard UI Mockups",
      "description": "Create high-fidelity wireframes and modern responsive designs.",
      "status": "In Progress",
      "dueDate": "2026-08-22T00:00:00.000Z",
      "createdAt": "2026-08-19T16:00:00.000Z",
      "updatedAt": "2026-08-19T16:00:00.000Z"
    }
  ]
}
```

#### 2. Create Task (`POST /api/tasks`)
**Request Payload:**
```json
{
  "title": "Implement API Rate Limiting",
  "description": "Add express-rate-limit middleware to prevent route abuse.",
  "status": "Pending",
  "dueDate": "2026-08-25T00:00:00.000Z"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "66c3b32c5f2b3c4d5e6f7a8c",
    "title": "Implement API Rate Limiting",
    "description": "Add express-rate-limit middleware to prevent route abuse.",
    "status": "Pending",
    "dueDate": "2026-08-25T00:00:00.000Z",
    "createdAt": "2026-08-19T22:00:00.000Z",
    "updatedAt": "2026-08-19T22:00:00.000Z"
  }
}
```

---

## ⚙️ Environment Variables Summary

### Backend (`backend/.env`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | Express server port | `5000` |
| `MONGODB_URI` | Connection URI for MongoDB instance | `mongodb://127.0.0.1:27017/task_manager` |
| `CORS_ORIGIN` | Allowed origin header for CORS requests | `http://localhost:3000` |

### Frontend (`frontend/.env.local`)

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL of backend REST API | `http://localhost:5000` |

---

## 🌐 Production Deployment Guide (Bare VPS + PM2 + Nginx)

This guide walks through deploying the application to a fresh Ubuntu Linux VPS without Docker containers.

### Step 1: Server Preparation
Update system packages and install Node.js (20.x):
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git
```

---

### Step 2: Codebase Deployment & Configuration

1. Clone your project repository on the server:
   ```bash
   git clone <your-repository-url> /var/www/task-management-app
   cd /var/www/task-management-app
   ```

2. Configure and build backend:
   ```bash
   cd backend
   cp .env.example .env
   nano .env # Set your production MONGODB_URI & CORS_ORIGIN
   npm install --omit=dev
   ```

3. Configure and build frontend:
   ```bash
   cd ../frontend
   cp .env.example .env.local
   nano .env.local # Set NEXT_PUBLIC_API_URL=https://yourdomain.com
   npm install
   npm run build
   ```

---

### Step 3: Process Management with PM2

Install PM2 globally to keep Node services alive across system reboots:
```bash
sudo npm install -g pm2

# Start backend service
cd /var/www/task-management-app/backend
pm2 start src/server.js --name task-backend

# Start frontend service
cd /var/www/task-management-app/frontend
pm2 start npm --name task-frontend -- start

# Persist process list
pm2 save
pm2 startup
```

---

### Step 4: Configure Nginx Reverse Proxy

Create an Nginx configuration file:
```bash
sudo nano /etc/nginx/sites-available/task-management-app
```

Add the following reverse proxy block:
```nginx
server {
    listen 80;
    server_name yourdomain.com; # Replace with your domain or IP address

    # Frontend Reverse Proxy
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Backend API Reverse Proxy
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable the configuration and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/task-management-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

### Step 5: Secure with SSL (Let's Encrypt)
*(Optional, recommended for custom domains)*
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

