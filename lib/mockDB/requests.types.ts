/*รอประเภท สเถียร */
export type Status = "pending" | "in_progress" | "resolved" | "paused" | "rejected";

export type PriorityLevel = "LOW" | "MEDIUM" | "HIGH" | "URGENT"
export type SourceChannel = "WEB" | "LINE" | "PHONE" | "WALKIN" | "APP"

export interface ServiceRequest {
  //db complaint 
  id: string                    // complaint_id
  complaintNo: string           // complaint_no

  title: string                 // title
  detail: string                // detail

  additional?: string           //additional แต่ยังไม่มีใน db

  category: string              // category_id (หรือ map เป็น label)
  subcategory?: string        // subcategory_id 

  status: Status         // current_status_id (map เป็น enum)

  priority: PriorityLevel       // priority_id (map เป็น enum)

  location: string              // location_text
  district: string              // district
  province: string              // province
  latitude: number              // latitude
  longitude: number             // longitude
  geocoded_at?: string          
  location_accuracy?: number,

  assignedTeamId: string        // assigned_team_id
  assignedUserId: string        // assigned_user_id

  isAnonymous: boolean          // is_anonymous
  isPublicView: boolean         // is_public_view

  dueDate: string               // due_date
  resolvedAt: string | null     // resolved_at
  closedAt: string | null       // closed_at
  createdAt: string             // created_at
  updatedAt: string             // updated_at

  //DB: ดึงจากตารางอื่น
  source:       SourceChannel   // channels.channel_type หรือ channels.name
  actionNote:   string          // จากworkflow_logs อิงจาก componentID 
  /*ui */
  icon: "trash" | "bolt" | "shield" | "stop"; //ถ้าข้อมุลจริงๆ จะดึง icon มาจาก db ชื่อคือ icon แต่จริงๆคือ emoji ดึงเปน text ได้
  /*นอกเหนือตาราง complaint */
  detailMeta?: string;
  date: string  //day format form createat
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
    rejected:    number;
  };
  requests: ServiceRequest[];
}

