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
        const compressed = await sharp(buffer)
            .rotate()
            .resize({ width: 800, height: 800, fit: "inside", withoutEnlargement: true })
            .toBuffer()

        const blob = await put(file.name, compressed, {
            access: "public",
            addRandomSuffix: true,
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "เกิดข้อผิดพลาด" }, { status: 500 })
    }
}