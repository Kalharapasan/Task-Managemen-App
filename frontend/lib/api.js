// Thin wrapper around fetch for talking to the Express API.
// Kept as plain functions (no extra libraries) so it's easy to follow.

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body.message || "Something went wrong");
  }

  return body;
}

export function getTasks() {
  return request("/api/tasks");
}

export function createTask(task) {
  return request("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(id, task) {
  return request(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}
