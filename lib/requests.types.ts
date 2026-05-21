export type RequestStatus = "in_progress" | "pending" | "resolved" | "paused";

export interface ServiceRequest {
  id: string;
  title: string;
  category: string;
  icon: "trash" | "bolt" | "shield" | "stop";
  status: RequestStatus;
  /** 0-100 progress (visual only) */
  progress: number;
  /** number of progress segments to render */
  steps: number;
  detail: string;
  detailMeta?: string;
  description?: string;
  location: string;
  date: string;
  group: "this_week" | "earlier";
  rating?: number;
  showRateAction?: boolean;
}

export interface RequestsPayload {
  user: { name: string };
  counts: { all: number; in_progress: number; done: number };
  requests: ServiceRequest[];
}