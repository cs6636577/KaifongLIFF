import data from "@/data/mock_data_may2026.json";
import { calcResolvedDuration, calcPendingDuration,getComplaintNumber } from "@/lib/mockDB/caseUtils";
import { STATUS_ID_MAP } from "@/lib/mockDB/status";
import type { ServiceRequest,Status } from "@/lib/mockDB/requests.types";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const item = data.complaints.find((c) => c.complaint_id === id);
  if (!item) return Response.json({ error: "not found" }, { status: 404 });

  const status: Status = getStatusCode(item.current_status_id);
  const isResolved   = status === "resolved";


  const result: Partial<ServiceRequest> & { address?: string; description?: string } = {
    id:          item.complaint_id,
    complaintNo: getComplaintNumber(item.complaint_no),
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

    // fake image metadata for frontend evidence display
    images: getComplaintImages(item.complaint_id),

    // fields ที่ StatusCard ใช้
    status,
    actionNote:  isResolved
                        ? calcResolvedDuration(item.complaint_id) : getLatestActionNote(item.complaint_id), 
    detail: item.detail,
    additional: item.additional_detail ?? "",
    detailMeta: isResolved
                      ? ""
                      : status === "pending"
                      ?  "\u00A0\u00A0\u00A0·\u00A0\u00A0" + calcPendingDuration(item.created_at)
                      : `\n${calcPendingDuration(item.created_at)}`,

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

function getComplaintImages(complaintId: string) {
  //ใส่ข้อมุลตามที่ดึงมาได้จากตาราง complaint_files โดยอิงจาก complaint_id
  //ในนี้แค่เขียนฟังก์ชันสมมติขึ้นมาเพื่อให้ได้โครงสร้างข้อมูลที่ frontend ต้องการเท่านั้น ไม่ได้ดึงจาก db จริงๆ
  const fileName1 = `${complaintId}-1.jpg`;
  const fileName2 = `${complaintId}-2.jpg`;

  return [
    {
      url: `https://137mnse6fuwyz2zc.public.blob.vercel-storage.com/%E0%B8%82%E0%B8%A2%E0%B8%B02-pxWbXcvzosvxb2PNCdjHxfMeHENEZW.jpg`,
      filePath: `/complaints/${complaintId}/${fileName1}`,
      filename: fileName1,
    },
    {
      url: null,
      filePath: `/complaints/${complaintId}/${fileName2}`,
      filename: fileName2,
    },
  ];
}


function getLatestActionNote(complaintId: string): string {
  const logs = data.workflow_logs
    .filter((l) => l.complaint_id === complaintId)
    .sort((a, b) => new Date(b.action_datetime).getTime() - new Date(a.action_datetime).getTime());
  return logs[0]?.action_note ?? "-";
}

function getStatusCode(statusId: string): Status {
  const code = data.meta.reference_ids.statuses.find(
    (s) => s.status_id === statusId
  )?.code;
   switch (code) {
    case "OPEN":
    case "PENDING":
      return "pending";
    case "IN_PROGRESS":
      return "in_progress";
    case "RESOLVED":
    case "CLOSED":
      return "resolved";
    case "PAUSED":
      return "paused";
    case "REJECTED":
      return "rejected";
    default:
      return "pending";
  }
}


//db-fake url ดึงรูป 