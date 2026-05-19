import data from "@/data/data.json"
import {calcResolvedDuration, calcPendingDuration, getGroup} from "@/lib/caseUtils";

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
          ? "พักการทำงาน เนื่องจาก ต้องการทรัพยากรเพิ่มเติม" //static 
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

