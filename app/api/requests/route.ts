import data from "@/data/data.json"
import caselog from "@/data/case_status_logs.json"

export async function GET() {
  const requests = data.cases
  .filter((item) => item.user_id === 1)
  .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
  .map((item) => {
    return {
      id: String(item.id),

      title: item.description,

      category: "แจ้งปัญหา",

      icon: 
      item.status === "paused" 
      ? "stop" 
      : item.status === "resolved"
      ? "shield"
      : item.status === "in_progress"
      ? "build"
      : "bolt",
      //map ตาม status

      status: item.status,

      progress:
        item.status === "resolved"
          ? 100
          : item.status === "in_progress"
          ? 70
          : item.status === "paused"
          ? 70
          : 50,

      steps: 4,

      detail: 
       item.status === "resolved"
          ? calcResolvedDuration(item.id) 
          : item.status === "in_progress"
          ? "ช่างอยู่ในพื้นที่แล้ว - กำลังดำเนินการ"
          : item.status === "paused"
          ? "พักการทำงาน เนื่องจาก ต้องการทรัพยากรเพิ่มเติม"
          : calcPendingDuration(item.datetime),

      detailMeta: ``,

      location: item.location,

      date: new Date(item.datetime).toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),

      group: getGroup(item.datetime),

      rating:
        item.status === "resolved"
           ? [5, undefined][
        Math.floor(Math.random() * 3)
      ]
     : undefined,

      showRateAction:
        item.status === "resolved",
    };
  });

  const payload = {
    user: {
      name: "สมชาย ใจดี",
    },

    counts: {
      all: requests.length,

      in_progress: requests.filter(
        (r) =>
          r.status === "in_progress" 
      ).length,

      resolved: requests.filter(
        (r) => r.status === "resolved"
      ).length,

       pending: requests.filter(
        (r) =>
          r.status === "pending"
      ).length,
      
      paused: requests.filter(
        (r) =>
          r.status === "paused" 
      ).length,
    },

    requests,
  };

  return Response.json(payload);
}

function calcResolvedDuration(caseId: number): string {
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

function calcPendingDuration(datetime: string): string {
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
    return `รอมอบหมายเจ้าหน้าที่\u00A0\u00A0 ·\u00A0\u00A0${days} วัน ${remainHours} ชม. ที่แล้ว`;
  }

  const hours = totalHours;
  const minutes = totalMinutes % 60;

  if (hours === 0) return `รอมอบหมายเจ้าหน้าที่ ${minutes} นาทีแล้ว`;
  if (minutes === 0) return `รอมอบหมายเจ้าหน้าที่ ${hours} ชม.แล้ว`;
  return `รอมอบหมายเจ้าหน้าที่\u00A0\u00A0 ·\u00A0\u00A0${hours} ชม. ${minutes} นาที ที่แล้ว`;
}

function getGroup(datetime: string): "this_week" | "earlier" {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  return new Date(datetime) >= startOfWeek ? "this_week" : "earlier";
}