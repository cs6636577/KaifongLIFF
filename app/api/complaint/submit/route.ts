// app/api/complaints/submit/route.ts
import { NextRequest, NextResponse } from "next/server"
//ข้อมุลที่ได้จากฟอร์ม
export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log("Form Data:", body)

        return NextResponse.json({ ok: true, data: body }) 
    } catch (error) {
        console.error("Error:", error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}

//insert ข้ิอมุล เข้าตาราง workload, compaints, img

//ต้องเก็บข้อมุลลงตาราง user ก่อน fullname phone  
//พอได้แล้วมันจะดึง userId จาก last ?

//ให้เอา userId มาใส่ complaintId 
//เสร็จแล้ว insert ข้้อมุล เข้าตาราง complaint workflow ต่อไป