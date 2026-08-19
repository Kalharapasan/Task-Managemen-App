"use client";

import { STATUSES, STATUS_STYLES } from "@/lib/statusConfig";

function formatDate(dateString) {
  const d = new Date(dateString);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isOverdue(dateString, status) {
  if (status === "Completed") return false;
  const due = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const style = STATUS_STYLES[task.status];
  const overdue = isOverdue(task.dueDate, task.status);

  return (
    <div
      className={`rounded-xl border border-line border-t-4 ${style.border} bg-surface p-4 shadow-sm transition hover:shadow-md`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display font-semibold text-ink leading-snug break-words">
          {task.title}
        </h3>
        <div className="flex shrink-0 gap-1">
          <button
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            className="rounded-md p-1.5 text-ink-soft hover:bg-paper hover:text-moss"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task)}
            aria-label="Delete task"
            className="rounded-md p-1.5 text-ink-soft hover:bg-clay-soft hover:text-clay"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18" />
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            </svg>
          </button>
        </div>
      </div>

      {task.description ? (
        <p className="mt-1.5 text-sm text-ink-soft line-clamp-3">{task.description}</p>
      ) : null}

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`text-xs font-medium ${overdue ? "text-clay" : "text-ink-soft"}`}
        >
          Due {formatDate(task.dueDate)}
          {overdue ? " · Overdue" : ""}
        </span>

        <select
          value={task.status}
          onChange={(e) => onStatusChange(task, e.target.value)}
          className={`rounded-md border-0 py-1 pl-2 pr-6 text-xs font-medium ${style.badge} focus:ring-2 focus:ring-moss`}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
