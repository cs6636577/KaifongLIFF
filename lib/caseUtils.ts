import data from "@/data/data.json"
import caselog from "@/data/case_status_logs.json"


export function calcResolvedDuration(caseId: number): string {
  const logs = caselog.filter((l) => l.case_id === caseId);
  const caseData = data.cases.find((c) => c.id === caseId);
  
  if (!caseData) return "แก้ไขเสร็จสิ้น";
  
  const resolvedLog = logs.find((l) => l.status === "resolved");
  if (!resolvedLog) return "แก้ไขเสร็จสิ้น";

  const start = new Date(caseData.datetime).getTime();
  const end = new Date(resolvedLog.changed_at).getTime();
  const diffMs = end - start;

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  if (totalHours >= 24) {
  const days = Math.floor(totalHours / 24);
  const remainHours = totalHours % 24;
  const remainMinutes = totalMinutes % 60;

  if (remainHours === 0 && remainMinutes === 0) return `แก้ไขเสร็จสิ้นภายใน ${days} วัน`;
  if (remainHours === 0) return `แก้ไขเสร็จสิ้นภายใน ${days} วัน ${remainMinutes} นาที`;
  if (remainMinutes === 0) return `แก้ไขเสร็จสิ้นภายใน ${days} วัน ${remainHours} ชม.`;
  return `แก้ไขเสร็จสิ้นภายใน ${days} วัน ${remainHours} ชม. ${remainMinutes} นาที`;
  }

  const hours =  totalHours;
  const minutes = totalMinutes % 60;

  if (hours === 0) return `แก้ไขเสร็จสิ้นภายใน ${minutes} นาที`;
  if (minutes === 0) return `แก้ไขเสร็จสิ้นภายใน ${hours} ชม.`;
  return `แก้ไขเสร็จสิ้นภายใน ${hours} ชม. ${minutes} นาที`;
}

export function calcPendingDuration(datetime: string): string {
  const start = new Date(datetime).getTime();
  const end = Date.now();
  const diffMs = end - start;

  const totalMinutes = Math.floor(diffMs / 1000 / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  if (totalHours >= 24) {
    const days = Math.floor(totalHours / 24);
    const remainHours = totalHours % 24;
    const remainMinutes = totalMinutes % 60;

    if (remainHours === 0 && remainMinutes === 0) return `รอมอบหมายเจ้าหน้าที่ ${days} วันแล้ว`;
    if (remainHours === 0) return `รอมอบหมายเจ้าหน้าที่\u00A0\u00A0 ·\u00A0\u00A0${days} วัน ${remainMinutes} นาทีแล้ว`;
    return `${days} วัน ${remainHours} ชม. ที่แล้ว`;
  }

  const hours = totalHours;
  const minutes = totalMinutes % 60;

  if (hours === 0) return `รอมอบหมายเจ้าหน้าที่ ${minutes} นาทีแล้ว`;
  if (minutes === 0) return `รอมอบหมายเจ้าหน้าที่ ${hours} ชม.แล้ว`;
  return `รอมอบหมายเจ้าหน้าที่\u00A0\u00A0 ·\u00A0\u00A0${hours} ชม. ${minutes} นาที ที่แล้ว`;
}

export function getGroup(datetime: string): "this_week" | "earlier" {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return new Date(datetime) >= startOfWeek ? "this_week" : "earlier";
}