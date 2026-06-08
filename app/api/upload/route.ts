// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import sharp from "sharp"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "ไม่มีไฟล์" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())

        // จัดการรูปภาพเบื้องต้น (หมุนรูป + ปรับขนาด)
        const basePipeline = () => sharp(buffer)
            .rotate()
            .resize({ width: 1024, fit: "inside", withoutEnlargement: true })

        // พยายามบีบอัดไฟล์ให้ได้ขนาดที่ใหญ่ขึ้นเล็กน้อย เพื่อให้ภาพยังมีรายละเอียดสำหรับ ML
        const TARGET_BYTES = 600 * 1024 // เป้าหมายประมาณ 600 KB
        let compressed: Buffer | null = null
        const minQuality = 70
        for (let q = 90; q >= minQuality; q -= 10) {
            try {
                const out = await basePipeline().jpeg({ quality: q }).toBuffer()
                if (out.length <= TARGET_BYTES || q === minQuality) {
                    compressed = out
                    console.log(`compress: chosen quality=${q}, size=${out.length}`)
                    break
                }
            } catch (err) {
                console.warn('sharp compress attempt failed at quality', q, err)
            }
        }

        // ถ้าบีบอัดรูปไม่สำเร็จ 
        if (!compressed) {
            throw new Error("Failed to compress image")
        }

        // ตั้งชื่อไฟล์ที่อัปโหลดให้เป็น .jpg ตามฟอร์แมตที่ได้
        
        const originalName = file.name?.trim() ?? ''
        // ถ้าไม่มีชื่อไฟล์จาก client จะสุ่มชื่อให้เพื่อป้องกันไฟล์ซ้ำ
        const nameBase = originalName
            ? originalName.replace(/\.[^/.]+$/, '')
            : `upload-${Date.now()}-${Math.floor(Math.random() * 1000000)}`
        const uploadName = `${nameBase}.jpg`
        
        //อัพโหลดไป Vercel Blob Storage
        //แต่ถ้ามี server แล้วเก็บเปน path หรือบันทึกรูปเข้า db ตรงๆให้ลบออกได้
        const blob = await put(uploadName, compressed, {
            access: "public",
            addRandomSuffix: true,
            contentType: "image/jpeg",
        })
        //ถ้ามี server ก้เก็บเข้า folder สำหรับตอนนี้คือเขียนไว้เฉยๆ เปนข้อมุล  
        //path ที่คิดไว้ complaints/{complaint_id}/{file_id}.{ext}
         const file_path = new URL(blob.url).pathname 
        //compressed แล้วเท่าไหร่
        console.log("before compress:", buffer.length, "after compress:", compressed.length)

        return NextResponse.json({ 
            file_url: blob.url, //ถ้ามี server เปลี่ยนเป็น URL ที่เข้าถึงได้จริงตาม server นั้นๆ
            file_type: "image", 
            file_name: uploadName,
            file_path: file_path, 
            file_size: compressed.length,
            mime_type: "image/jpeg", //หลัง convert
            
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 })
    }
}


