import data from "@/data/data.json";
import {calcResolvedDuration, calcPendingDuration} from "@/lib/caseUtils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = data.cases.find((c) => String(c.id) === id);
  if (!item) return Response.json({ error: "not found" }, { status: 404 });

  const result = {
    id: String(item.id),
    title: item.description,
    location: item.location,
    date: new Date(item.datetime).toLocaleDateString("th-TH", {
      day: "numeric", month: "short", year: "numeric",
    }),
    // รายละเอียดคำร้อง
    category: "ขยะมูลฝอยสิ่งปฏิกูล",
    address: item.location,
    description: item.description,

    // fields ที่ StatusCard ใช้
    status: item.status,
     detail: 
       item.status === "resolved"
          ? calcResolvedDuration(item.id) 
          : item.status === "in_progress"
          ? "ช่างอยู่ในพื้นที่แล้ว - กำลังดำเนินการ"
          : item.status === "paused"
          ? "พักการทำงาน เนื่องจาก ต้องการทรัพยากรเพิ่มเติม" //static 
          : calcPendingDuration(item.datetime),

    detailMeta: "",
    icon: "build",
  };

  return Response.json(result);
}
