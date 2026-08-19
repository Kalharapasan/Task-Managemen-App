"use client";

import { useState } from "react";
import { STATUSES } from "@/lib/statusConfig";

const emptyForm = { title: "", description: "", status: "Pending", dueDate: "" };

function toFormState(initialTask) {
  if (!initialTask) return emptyForm;
  return {
    title: initialTask.title,
    description: initialTask.description || "",
    status: initialTask.status,
    dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : "",
  };
}

// Note: the parent remounts this component (via a `key`) whenever it is
// opened for a different task, so the form fields below only ever need to
// be initialized once - no effect required to "reset" them.
export default function TaskFormModal({ open, onClose, onSubmit, initialTask }) {
  const [form, setForm] = useState(() => toFormState(initialTask));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  if (!open) return null;

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.dueDate) {
      setError("Due date is required.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSubmit(form);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-ink">
            {initialTask ? "Edit task" : "New task"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-md p-1 text-ink-soft hover:bg-paper"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18" />
              <path d="M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="mb-1 block text-sm font-medium text-ink">
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Write the project proposal"
              className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-1 block text-sm font-medium text-ink">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Add any useful detail (optional)"
              className="w-full resize-none rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-medium text-ink">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className="mb-1 block text-sm font-medium text-ink">
                Due date
              </label>
              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/30"
              />
            </div>
          </div>

          {error ? <p className="text-sm text-clay">{error}</p> : null}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-ink-soft hover:bg-paper"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-moss px-4 py-2 text-sm font-medium text-white hover:bg-moss-dark disabled:opacity-60"
            >
              {saving ? "Saving..." : initialTask ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
