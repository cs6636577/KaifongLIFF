// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "ไม่มีไฟล์" }, { status: 400 })
        }

        const blob = await put(file.name, file, {
            access: "public",
            addRandomSuffix: true,
        })

        return NextResponse.json({ url: blob.url })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}