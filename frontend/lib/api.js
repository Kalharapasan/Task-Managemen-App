const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000").replace(/\/$/, "");

async function fetcher(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function getTasks() {
  return fetcher("/api/tasks");
}

export async function createTask(taskData) {
  return fetcher("/api/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(id, taskData) {
  return fetcher(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(id) {
  return fetcher(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}
