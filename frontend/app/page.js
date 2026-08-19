"use client";

import { useEffect, useMemo, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "@/lib/api";
import { STATUSES, STATUS_STYLES } from "@/lib/statusConfig";
import TaskCard from "@/components/TaskCard";
import TaskFormModal from "@/components/TaskFormModal";
import ConfirmDialog from "@/components/ConfirmDialog";
import Toast from "@/components/Toast";

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [search, setSearch] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [confirmTask, setConfirmTask] = useState(null);
  const [toast, setToast] = useState(null);

  async function loadTasks() {
    setLoading(true);
    setLoadError("");
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  function openCreateForm() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEditForm(task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  async function handleFormSubmit(form) {
    if (editingTask) {
      const res = await updateTask(editingTask._id, form);
      setTasks((prev) => prev.map((t) => (t._id === res.data._id ? res.data : t)));
      setToast({ type: "success", message: "Task updated." });
    } else {
      const res = await createTask(form);
      setTasks((prev) => [res.data, ...prev]);
      setToast({ type: "success", message: "Task created." });
    }
    setFormOpen(false);
  }

  async function handleStatusChange(task, status) {
    const previous = tasks;
    setTasks((prev) => prev.map((t) => (t._id === task._id ? { ...t, status } : t)));
    try {
      await updateTask(task._id, { ...task, status });
    } catch (err) {
      setTasks(previous);
      setToast({ type: "error", message: err.message });
    }
  }

  async function handleDeleteConfirmed() {
    const task = confirmTask;
    setConfirmTask(null);
    try {
      await deleteTask(task._id);
      setTasks((prev) => prev.filter((t) => t._id !== task._id));
      setToast({ type: "success", message: "Task deleted." });
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  }

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks;
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => t.title.toLowerCase().includes(q));
  }, [tasks, search]);

  const columns = useMemo(() => {
    const grouped = { Pending: [], "In Progress": [], Completed: [] };
    for (const task of filteredTasks) {
      grouped[task.status]?.push(task);
    }
    return grouped;
  }, [filteredTasks]);

  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-surface">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-ink">Taskboard</h1>
            <p className="text-sm text-ink-soft">
              {tasks.length} task{tasks.length === 1 ? "" : "s"} across three stages
            </p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="w-48 rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
            />
            <button
              onClick={openCreateForm}
              className="flex items-center gap-1.5 rounded-lg bg-moss px-4 py-2 text-sm font-medium text-white hover:bg-moss-dark"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14" />
                <path d="M5 12h14" />
              </svg>
              New task
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {loading ? (
          <p className="text-center text-sm text-ink-soft">Loading tasks...</p>
        ) : loadError ? (
          <div className="rounded-xl border border-clay-soft bg-clay-soft px-4 py-3 text-sm text-clay">
            Couldn&apos;t load tasks: {loadError}. Is the API server running at{" "}
            <code>{process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}</code>?
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {STATUSES.map((status) => (
              <section key={status} className="flex flex-col gap-3">
                <div className="flex items-center gap-2 px-1">
                  <span className={`h-2 w-2 rounded-full ${STATUS_STYLES[status].dot}`} />
                  <h2 className="font-display text-sm font-semibold text-ink">{status}</h2>
                  <span className="text-xs text-ink-soft">{columns[status].length}</span>
                </div>

                <div className="flex flex-col gap-3">
                  {columns[status].length === 0 ? (
                    <div className="rounded-xl border border-dashed border-line px-4 py-6 text-center text-xs text-ink-soft">
                      No tasks here yet.
                    </div>
                  ) : (
                    columns[status].map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEditForm}
                        onDelete={setConfirmTask}
                        onStatusChange={handleStatusChange}
                      />
                    ))
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <TaskFormModal
        key={formOpen ? editingTask?._id ?? "new" : "closed"}
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
      />

      <ConfirmDialog
        open={!!confirmTask}
        title="Delete this task?"
        message={confirmTask ? `"${confirmTask.title}" will be permanently removed.` : ""}
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setConfirmTask(null)}
      />

      <Toast toast={toast} />
    </div>
  );
}
