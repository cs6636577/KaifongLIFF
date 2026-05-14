import data from "@/data/data.json"

export async function GET() {
  const requests = data.cases.map((item) => {
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

      detail: item.location_detail,

      detailMeta: `เลขเคส #${item.id}`,

      location: item.location,

      date: new Date(
        item.datetime
      ).toLocaleDateString("th-TH"),

      group: "this_week",

      rating:
        item.status === "resolved"
           ? [4, 5, undefined][
        Math.floor(Math.random() * 3)
      ]
     : undefined,

      showRateAction:
        item.status === "resolved",
    };
  });

  const payload = {
    user: {
      name: "คนนี้ เทส",
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