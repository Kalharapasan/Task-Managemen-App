const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();


app.use(
    cors({
        origin: true,
        credentials: true,
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
