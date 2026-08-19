const Task = require("../models/Task");

// Small helper so we don't repeat try/catch in every handler
const handle = (fn) => async (req, res) => {
    try {
        await fn(req, res);
    } catch (err) {
        // Mongoose validation errors -> 400, everything else -> 500
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map((e) => e.message);
            return res.status(400).json({ success: false, message: messages.join(", ") });
        }
        if (err.name === "CastError") {
            return res.status(400).json({ success: false, message: "Invalid task id" });
        }
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// GET /api/tasks?status=Pending&search=keyword
exports.getTasks = handle(async (req, res) => {
    const { status, search } = req.query;
    const filter = {};

    if (status && ["Pending", "In Progress", "Completed"].includes(status)) {
        filter.status = status;
    }
    if (search) {
        filter.title = { $regex: search, $options: "i" };
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// GET /api/tasks/:id
exports.getTask = handle(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
});

// POST /api/tasks
exports.createTask = handle(async (req, res) => {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.create({ title, description, status, dueDate });
    res.status(201).json({ success: true, data: task });
});

// PUT /api/tasks/:id
exports.updateTask = handle(async (req, res) => {
    const { title, description, status, dueDate } = req.body;

    const task = await Task.findByIdAndUpdate(
        req.params.id,
        { title, description, status, dueDate },
        { new: true, runValidators: true }
    );

    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: task });
});

// DELETE /api/tasks/:id
exports.deleteTask = handle(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.status(200).json({ success: true, data: {} });
});
