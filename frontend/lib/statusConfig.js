export const STATUSES = ["Pending", "In Progress", "Completed"];

export const STATUS_STYLES = {
  Pending: {
    dot: "bg-amber-500",
    border: "border-t-amber-500",
    badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  "In Progress": {
    dot: "bg-blue-500",
    border: "border-t-blue-500",
    badge: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  Completed: {
    dot: "bg-emerald-500",
    border: "border-t-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
};
