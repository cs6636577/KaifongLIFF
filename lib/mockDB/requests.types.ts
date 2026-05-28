export type RequestStatus  =
  | "OPEN"
  | "open"
  | "pending"
  | "PENDING"
  | "IN_PROGRESS"
  | "in_progress"
  | "RESOLVED"
  | "resolved"
  | "PAUSED"
  | "paused"
  | "CLOSED"
  | "closed";

/*รอประเภท สเถียร */
export type NormalizedStatus = "pending" | "in_progress" | "resolved" | "paused";

export const STATUS_MAP: Record<RequestStatus, NormalizedStatus> = {
  OPEN: "pending",
  open: "pending",
  pending: "pending",
  PENDING: "pending",
  IN_PROGRESS: "in_progress",
  in_progress: "in_progress",
  RESOLVED: "resolved",
  resolved: "resolved",
  PAUSED: "paused",
  paused: "paused",
  CLOSED: "resolved",
  closed: "resolved",
};

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type SourceChannel = "WEB" | "LINE" | "PHONE" | "WALKIN" | "APP"

export interface ServiceRequest {
  id: string                    // complaint_id
  complaintNo: string           // complaint_no

  title: string                 // title
  detail: string                // detail

  additional?: string           //additional แต่ยังไม่มีใน db

  category: string              // category_id (หรือ map เป็น label)
  subcategory?: string        // subcategory_id 

  status: NormalizedStatus         // current_status_id (map เป็น enum)

  priority: PriorityLevel       // priority_id (map เป็น enum)
  source: SourceChannel         // source_channel_detail

  location: string              // location_text
  district: string              // district
  province: string              // province
  latitude: number              // latitude
  longitude: number             // longitude

  assignedTeamId: string        // assigned_team_id
  assignedUserId: string        // assigned_user_id

  isAnonymous: boolean          // is_anonymous
  isPublicView: boolean         // is_public_view

  dueDate: string               // due_date
  resolvedAt: string | null     // resolved_at
  closedAt: string | null       // closed_at
  createdAt: string             // created_at
  updatedAt: string             // updated_at


  icon: "trash" | "bolt" | "shield" | "stop";
  /*นอกเหนือตาราง complaint */
  detailMeta?: string;
  date: string  //day format form createat
  actionNote: string //action_note from workflow table เอาไว้ดูแอคชั่นของสถานะว่ากำลังทำอะไร
  
   /** 0-100 progress (visual only) */
  progress: number;
  /** number of progress segments to render */
  steps: number;
  group: "this_week" | "earlier";
  rating?: number;
  showRateAction?: boolean;
}

export interface RequestsPayload {
  user: { name: string };
  counts: { 
    all: number; 
    in_progress: number;
    resolved:    number;  
    pending:     number;  
    paused:      number; 
  };
  requests: ServiceRequest[];
}

