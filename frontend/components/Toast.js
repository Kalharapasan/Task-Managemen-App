"use client";

export default function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      role="status"
      className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-lg transition ${
        isError ? "bg-clay" : "bg-moss-dark"
      }`}
    >
      {toast.message}
    </div>
  );
}
