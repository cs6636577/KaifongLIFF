import data from "@/data/data.json"

export async function GET() {
  //ดึงของ mock มาใช้ก่อน เดี๋ยว form เสดจะเอาตัว form มาใช้
  return Response.json(data.users[0]);
}