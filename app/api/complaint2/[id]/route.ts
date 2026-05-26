import data from "@/data/mock_data_may2026.json";
import { calcResolvedDuration, calcPendingDuration } from "@/lib/mockDB/caseUtils";
import { STATUS_ID_MAP } from "@/lib/mockDB/status";
import type { ServiceRequest } from "@/lib/mockDB/requests.types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = data.complaints.find((c) => c.complaint_id === id);
  if (!item) return Response.json({ error: "not found" }, { status: 404 });

  const status = STATUS_ID_MAP[item.current_status_id] ?? "pending";
  const isResolved   = status === "resolved";
  const isInProgress = status === "in_progress";

  const result: Partial<ServiceRequest> & { address?: string; description?: string } = {
    id:          item.complaint_id,
    complaintNo: item.complaint_no,
    title:       item.title ?? "",
    location:    item.location_text,
    district:    item.district,
    province:    item.province,
    updatedAt:        new Date(item.created_at).toLocaleDateString("th-TH", {
                   day: "numeric", month: "short", year: "numeric",
                 }),

    // รายละเอียดคำร้อง
    category:    getCategory(item.category_id),
    subcategory: getSubcategory(item.subcategory_id),
    address:     item.location_text,
    description: item.detail,

    // fields ที่ StatusCard ใช้
    status,
    detail: isResolved
      ? calcResolvedDuration(item.complaint_id)
      : isInProgress
      ? "ช่างอยู่ในพื้นที่แล้ว - กำลังดำเนินการ"
      : "รอมอบหมายเจ้าหน้าที่",

    detailMeta: isResolved
      ? ""
      : isInProgress
      ? calcPendingDuration(item.created_at)
      : "\u00A0\u00A0\u00A0·\u00A0\u00A0" + calcPendingDuration(item.created_at),

    icon: "bolt",
  };

  return Response.json(result);
}

function getCategory(id: string): string {
  return data.meta.reference_ids.categories.find((c) => c.category_id === id)?.name ?? "-";
}

function getSubcategory(id: string): string {
  return data.meta.reference_ids.subcategories.find((s) => s.subcategory_id === id)?.name ?? "-";
}