# Task Management System

A simple full-stack task manager.

- **Frontend:** Next.js (React) + Tailwind CSS
- **Backend:** Node.js + Express (REST API)
- **Database:** MongoDB (via Mongoose)

Tasks have four fields: **Title**, **Description**, **Status** (`Pending` / `In Progress` / `Completed`), and **Due Date**. The UI is a 3-column board (one column per status) with search, create, edit, delete, and inline status changes.

```
task-management-app/
├── backend/     Express REST API
└── frontend/    Next.js UI
```

---

## 1. Run it locally

### Prerequisites
- Node.js 18+ and npm
- A MongoDB instance — either installed locally, or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (no install needed)

### Backend

```bash
cd backend
cp .env.example .env
# edit .env if your MongoDB URI or port is different
npm install
npm run dev        # starts on http://localhost:5000
```

### Frontend

In a second terminal:

```bash
cd frontend
cp .env.example .env.local
# edit .env.local if your backend isn't on http://localhost:5000
npm install
npm run dev         # starts on http://localhost:3000
```

Open `http://localhost:3000` — you should see the empty board. Click **New task** to create your first one.

### API reference

| Method | Route             | Description                          |
|--------|--------------------|---------------------------------------|
| GET    | `/api/tasks`        | List tasks (`?status=`, `?search=`)  |
| GET    | `/api/tasks/:id`     | Get a single task                     |
| POST   | `/api/tasks`         | Create a task                         |
| PUT    | `/api/tasks/:id`     | Update a task                         |
| DELETE | `/api/tasks/:id`     | Delete a task                         |
| GET    | `/api/health`        | Health check                          |

---

## 2. Deploy on a bare VPS (no Docker)

This assumes a fresh Ubuntu VPS and that you already have a domain (optional — you can use the server's IP address instead).

### Step 1 — Install Node.js and MongoDB on the server

```bash
# Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# MongoDB (Community Edition) — official instructions:
# https://www.mongodb.com/docs/manual/administration/install-on-linux/
sudo systemctl enable --now mongod
```

If you'd rather not run MongoDB yourself, create a free cluster on [MongoDB Atlas](https://www.mongodb.com/atlas) instead and skip straight to Step 3 with that connection string.

### Step 2 — Get the code onto the server

```bash
git clone <your-repo-url> task-management-app
cd task-management-app
```

### Step 3 — Configure and install the backend

```bash
cd backend
cp .env.example .env
nano .env
# MONGODB_URI=mongodb://127.0.0.1:27017/task_manager   (or your Atlas URI)
# PORT=5000
# CORS_ORIGIN=https://yourdomain.com

npm install --omit=dev
```

### Step 4 — Build and configure the frontend

```bash
cd ../frontend
cp .env.example .env.local
nano .env.local
# NEXT_PUBLIC_API_URL=https://yourdomain.com/api   (see Nginx step below)

npm install
npm run build
```

### Step 5 — Keep both processes alive with PM2

```bash
sudo npm install -g pm2

cd ../backend
pm2 start src/server.js --name task-backend

cd ../frontend
pm2 start npm --name task-frontend -- start

pm2 save
pm2 startup   # follow the printed instructions so PM2 survives a reboot
```

The API is now on port `5000` and the frontend on port `3000` (Next's default). Check both are up:

```bash
pm2 status
curl http://localhost:5000/api/health
curl http://localhost:3000
```

### Step 6 — Put Nginx in front (reverse proxy + your domain)

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/task-management-app
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/task-management-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

With this setup, `NEXT_PUBLIC_API_URL` in `frontend/.env.local` should be `https://yourdomain.com/api` (rebuild the frontend after changing it: `npm run build && pm2 restart task-frontend`).

### Step 7 (optional) — Free HTTPS with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### Updating after a `git pull`

```bash
cd backend && npm install --omit=dev && pm2 restart task-backend
cd ../frontend && npm install && npm run build && pm2 restart task-frontend
```

---

## Notes on the code

- No Docker, no build pipeline beyond `npm run build` — everything runs as plain Node processes managed by PM2.
- No authentication — the spec only asked for task CRUD, so the app was kept to that scope. If you need to add auth later, `backend/src/middleware/` is where a JWT check would slot in, and you'd protect `backend/src/routes/taskRoutes.js`.
- State management on the frontend is plain React `useState`/`useEffect` — no Redux/Zustand — since the app has a single page and a handful of related pieces of state.
