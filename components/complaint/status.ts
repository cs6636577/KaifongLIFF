import type { RequestStatus } from "@/lib/requests.types";

export const STATUS_LABEL: Record<RequestStatus, string> = {
  in_progress: "กำลังดำเนินการ",
  pending: "รอดำเนินการ",
  resolved: "เสร็จสิ้น",
  paused: "พักงาน",
};

/** Tailwind classes for the small status pill in the top-right of each card. */
export const STATUS_PILL: Record<RequestStatus, string> = {
  in_progress: "text-status-progress bg-status-progress/10",
  pending: "text-status-pending bg-status-pending/15",
  resolved: "text-status-done bg-status-done/10",
  paused: "text-muted-foreground bg-muted",
};

/** Color used for the left accent bar and the progress fill. */
export const STATUS_ACCENT: Record<RequestStatus, string> = {
  in_progress: "bg-status-progress",
  pending: "bg-status-pending",
  resolved: "bg-status-done",
  paused: "bg-status-paused",
};

/** Soft tinted background for the icon tile on the left side of the card. */
export const STATUS_ICON_TILE: Record<RequestStatus, string> = {
  in_progress: "bg-status-progress/10 text-status-progress",
  pending: "bg-status-pending/15 text-status-pending",
  resolved: "bg-status-done/10 text-status-done",
  paused: "bg-muted text-foreground",
};