// app/api/user/route.ts
// สำหรับ  AuthenUser และส่งข้อมุลที่จำเปน คือ display name ในตาราง user 
import data from "@/data/mock_data_may2026.json";
import { getCurrentUserId } from "@/lib/session";

export async function GET(): Promise<Response> {
  const userId = getCurrentUserId();

  const user = data.meta.reference_ids.citizen_users.find(
    (u) => u.user_id === userId
  );

  if (!user) return Response.json({ error: "not found" }, { status: 404 });

  return Response.json({
    //display_name ชื่อจากไลน์
    name:    user.display_name.split(" ")[0],
    lastname: user.display_name.split(" ")[1] ?? "",
    phone:   user.phone, //ใน  mock data แรกไม่ได้มี เบอร์หลายเบอร์ในหลายตาราง user เลยเขียนแบบนี้ไว้ก่อน
    
  });
}