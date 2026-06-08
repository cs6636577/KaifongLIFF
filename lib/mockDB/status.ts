import type { NormalizedStatus } from "@/lib/mockDB/requests.types";
import statusMaster from "@/data/status_master.json";

const STATUS_CODE_TO_NORMALIZED: Record<string, NormalizedStatus> = {
  OPEN:        "pending",
  IN_PROGRESS: "in_progress",
  PENDING:     "pending",
  RESOLVED:    "resolved",
  CLOSED:      "resolved",
};

export const STATUS_ID_MAP = Object.fromEntries(
  statusMaster.status_master.map((s) => [
    s.status_id,
    STATUS_CODE_TO_NORMALIZED[s.status_code] ?? "pending",
  ])
) as Record<string, NormalizedStatus>;

export const STATUS_LABEL: Record<NormalizedStatus, string> = {
  in_progress: "กำลังดำเนินการ",
  pending: "รอดำเนินการ",
  resolved: "เสร็จสิ้น",
  paused: "พักงาน",
};

export const STATUS_PILL: Record<NormalizedStatus, string> = {
  in_progress: "text-status-progress bg-status-progress/10",
  pending: "text-status-pending bg-status-pending/15",
  resolved: "text-status-done bg-status-done/10",
  paused: "text-muted-foreground bg-muted",
};

export const STATUS_ACCENT: Record<NormalizedStatus, string> = {
  in_progress: "bg-status-progress",
  pending: "bg-status-pending",
  resolved: "bg-status-done",
  paused: "bg-status-paused",
};

export const STATUS_ICON_TILE: Record<NormalizedStatus, string> = {
  in_progress: "bg-status-progress/10 text-status-progress",
  pending: "bg-status-pending/15 text-status-pending",
  resolved: "bg-status-done/10 text-status-done",
  paused: "bg-muted text-foreground",
};

export const STATUS_PROGRESS: Record<NormalizedStatus, number> = {
  pending:     50,
  in_progress: 70,
  resolved:    100,
  paused:      70,
};