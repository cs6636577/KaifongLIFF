// lib/caseUtils.ts

import data from "@/data/mock_data_may2026.json";

export function calcResolvedDuration(complaintId: string): string {
  const complaint = data.complaints.find((c) => c.complaint_id === complaintId);
  if (!complaint?.resolved_at) return "แก้ไขเสร็จสิ้น";

  const diffMs =
    new Date(complaint.resolved_at).getTime() -
    new Date(complaint.created_at).getTime();

  return formatDuration(diffMs, "แก้ไขเสร็จสิ้นภายใน");
}

export function calcPendingDuration(datetime: string): string {
  return formatDuration(Date.now() - new Date(datetime).getTime(), "");
}

export function getGroup(datetime: string): "this_week" | "earlier" {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return new Date(datetime) >= startOfWeek ? "this_week" : "earlier";
}

function formatDuration(ms: number, prefix: string): string {
  const totalMin = Math.floor(ms / 60000);
  const totalHr  = Math.floor(totalMin / 60);
  const days     = Math.floor(totalHr / 24);
  const hrs      = totalHr % 24;
  const mins     = totalMin % 60;

  const parts: string[] = [];
  if (days) parts.push(`${days} วัน`);
  if (hrs)  parts.push(`${hrs} ชม.`);
  if (mins && !days) parts.push(`${mins} นาที`);

  if (!parts.length) parts.push("ไม่กี่นาที");

  return prefix
    ? `${prefix} ${parts.join(" ")}`
    : `${parts.join(" ")} ที่แล้ว`;
}