const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((o) => o.trim())
    .concat("https://task-managemen-app-frontend.vercel.app");

app.use(
    cors({
        origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    })
);

app.use(express.json());


app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "API is running" });
});

app.use("/api/tasks", taskRoutes);


app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

module.exports = app;
