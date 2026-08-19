// Single source of truth for the three statuses and how they look.
// Any component that needs status colors/labels reads from here.
export const STATUSES = ["Pending", "In Progress", "Completed"];

export const STATUS_STYLES = {
  Pending: {
    dot: "bg-amber",
    text: "text-amber",
    badge: "bg-amber-soft text-amber",
    border: "border-t-amber",
  },
  "In Progress": {
    dot: "bg-signal",
    text: "text-signal",
    badge: "bg-signal-soft text-signal",
    border: "border-t-signal",
  },
  Completed: {
    dot: "bg-leaf",
    text: "text-leaf",
    badge: "bg-leaf-soft text-leaf",
    border: "border-t-leaf",
  },
};
