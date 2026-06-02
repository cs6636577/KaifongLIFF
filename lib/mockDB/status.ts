import type {Status } from "@/lib/mockDB/requests.types";
import data from "@/data/mock_data_may2026.json" ;

const STATUS_CODE_TO_NORMALIZED: Record<string, Status> = {
  OPEN:        "pending",
  IN_PROGRESS: "in_progress",
  PENDING:     "pending",
  RESOLVED:    "resolved",
  CLOSED:      "resolved",
  REJECTED: "rejected"
};

export const STATUS_ID_MAP = Object.fromEntries(
  data.meta.reference_ids.statuses.map((s) => [
    s.status_id,
    STATUS_CODE_TO_NORMALIZED[s.code] ?? "pending",
  ])
) as Record<string, Status>;

export const STATUS_LABEL: Record<Status, string> = {
  in_progress: "กำลังดำเนินการ",
  pending: "รอดำเนินการ",
  resolved: "เสร็จสิ้น",
  paused: "พักงาน",
  rejected: "ถูกปฎิเสธ"
};

export const STATUS_PILL: Record<Status, string> = {
  in_progress: "text-status-progress bg-status-progress/10",
  pending: "text-status-pending bg-status-pending/15",
  resolved: "text-status-done bg-status-done/10",
  paused: "text-muted-foreground bg-muted",
  rejected: "text-red-700 bg-red-50",
};

export const STATUS_ACCENT: Record<Status, string> = {
  in_progress: "bg-status-progress",
  pending: "bg-status-pending",
  resolved: "bg-status-done",
  paused: "bg-status-paused",
  rejected: "bg-red-400",
};

export const STATUS_ICON_TILE: Record<Status, string> = {
  in_progress: "bg-status-progress/10 text-status-progress",
  pending: "bg-status-pending/15 text-status-pending",
  resolved: "bg-status-done/10 text-status-done",
  paused: "bg-muted text-foreground",
  rejected: "bg-red-50 text-red-700",
};

export const STATUS_PROGRESS: Record<Status, number> = {
  pending:     33.33,
  in_progress: 66.66,
  resolved:    100,
  paused:      66.66,
  rejected: 33.33
};