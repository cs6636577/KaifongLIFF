// app/api/requests/route.ts

import data from "@/data/mock_data_may2026.json";
import { calcResolvedDuration, calcPendingDuration, getGroup, getComplaintNumber } from "@/lib/mockDB/caseUtils";
import type {NormalizedStatus, PriorityLevel, SourceChannel, ServiceRequest, RequestsPayload} from "@/lib/mockDB/requests.types";
import { STATUS_ID_MAP,STATUS_PROGRESS } from "@/lib/mockDB/status";
import { getCurrentUserId } from "@/lib/session";

const TARGET_USER_ID = getCurrentUserId(); //ถ้าใช้แบคเอน auth ให้ไปแก้ใน /lib/session ตอนนี้ hardcode id 

const currentUser = data.meta.reference_ids.citizen_users.find(
  (u) => u.user_id === TARGET_USER_ID
);

const CATEGORY_ICON: Record<string, ServiceRequest["icon"]> = {
  "cccc0000-0000-0000-0000-000000000001": "stop",   // น้ำประปา
  "cccc0000-0000-0000-0000-000000000002": "bolt",   // ไฟฟ้า
  "cccc0000-0000-0000-0000-000000000003": "stop",   // ถนน/ทางเท้า
  "cccc0000-0000-0000-0000-000000000004": "trash",  // ขยะ/สิ่งแวดล้อม
  "cccc0000-0000-0000-0000-000000000005": "shield", // เสียงรบกวน
};

const PRIORITY_MAP: Record<string, PriorityLevel> = {
  "eeee0000-0000-0000-0000-000000000001": "URGENT",
  "eeee0000-0000-0000-0000-000000000002": "HIGH",
  "eeee0000-0000-0000-0000-000000000003": "MEDIUM",
  "eeee0000-0000-0000-0000-000000000004": "LOW",
};

export async function GET(): Promise<Response> {
  const complaints = data.complaints
    .filter((c) => c.user_id === TARGET_USER_ID)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

 const requests: ServiceRequest[] = complaints.map((c) => {
    const status: NormalizedStatus = STATUS_ID_MAP[c.current_status_id] ?? "pending";
    const isResolved = status === "resolved";
    const isInProgress = status === "in_progress";

    return {
      id:          c.complaint_id,
      complaintNo: getComplaintNumber(c.complaint_no) || "",
      title:       getCategory(c.category_id) || "",
      detail: c.detail,
      actionNote:      isResolved
                     ? calcResolvedDuration(c.complaint_id)
                     : isInProgress
                     ? getLatestActionNote(c.complaint_id)
                     : "รอมอบหมายเจ้าหน้าที่",
      category:    c.category_id,
      status,
      priority:    PRIORITY_MAP[c.priority_id] ?? "LOW",
      source:      c.source_channel_detail as SourceChannel,
      location:    c.location_text,
      district:    c.district,
      province:    c.province,
      latitude:    c.latitude,
      longitude:   c.longitude,
      assignedTeamId: c.assigned_team_id ?? "",
      assignedUserId: c.assigned_user_id ?? "",
      isAnonymous:    c.is_anonymous,
      isPublicView:   c.is_public_view,
      dueDate:     c.due_date,
      resolvedAt:  c.resolved_at,
      closedAt:    c.closed_at,
      createdAt:   c.created_at,
      updatedAt:   c.updated_at,

      // UI fields
      icon:        CATEGORY_ICON[c.category_id] ?? "bolt",
      detailMeta:  isResolved
                     ? ""
                     : isInProgress
                     ? calcPendingDuration(c.created_at)
                     : "\u00A0\u00A0\u00A0·\u00A0\u00A0" + calcPendingDuration(c.created_at),
      progress:    STATUS_PROGRESS[status],
      steps:       4,
      date:        new Date(c.created_at).toLocaleDateString("th-TH", {
                     day: "numeric", month: "short", year: "numeric",
                   }),
      group:          getGroup(c.created_at),
      rating:         getRating(c.complaint_id, TARGET_USER_ID),
      showRateAction: isResolved,
    };
  });

  const payload: RequestsPayload = {
    user:   { name: currentUser?.display_name ?? "ผู้ใช้งาน" }, 
    counts: {
      all:         requests.length,
      in_progress: requests.filter((r) => r.status === "in_progress").length,
      resolved:    requests.filter((r) => r.status === "resolved").length,
      pending:     requests.filter((r) => r.status === "pending").length,
      paused:      requests.filter((r) => r.status === "paused").length,
    },
    requests,
  };

  return Response.json(payload);
}

function getRating(complaintId: string, userId: string): number | undefined {
  return data.complaint_feedback.find(
    (f) => f.complaint_id === complaintId && f.user_id === userId
  )?.score_overall ?? undefined;
}

function getCategory(category_id: string): string | undefined {
  return data.meta.reference_ids.categories.find(
    (c) => c.category_id === category_id
  )?.name ?? undefined;
}

function getLatestActionNote(complaintId: string): string {
  const logs = data.workflow_logs
    .filter((l) => l.complaint_id === complaintId)
    .sort((a, b) => new Date(b.action_datetime).getTime() - new Date(a.action_datetime).getTime());
  return logs[0]?.action_note ?? "-";
}
