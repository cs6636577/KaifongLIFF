// app/api/complaints/submit/route.ts
import { NextRequest, NextResponse } from "next/server"

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