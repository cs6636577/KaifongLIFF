// app/api/form/card/route.ts
import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers" 

export async function POST(req: NextRequest) {
    try{
        const body = await req.json()

        console.log("body:", body)
        const res = NextResponse.json({ ok: true })

        res.cookies.set("issueType", body.issueType)
        res.cookies.set("subIssue", body.subIssue)
        res.cookies.set("detail", body.detail)
        res.cookies.set("location", body.location)
        res.cookies.set("lat",body.lat)
        res.cookies.set("lng",body.lng)
        res.cookies.set("province",body.province)
        res.cookies.set("district",body.district)
        res.cookies.set("locationDescription", body.locationDescription)
        res.cookies.set("additionalNotes", body.additionalNotes)


        return res
    }catch (error){
        console.error("API Error:", error)  // ดู error จริงๆ
        return NextResponse.json({ error: String(error) }, { status: 500 })
    }
}

export async function GET() {
    const cookieStore = await cookies()
    return NextResponse.json({
        issueType: cookieStore.get("issueType")?.value ?? "",
        subIssue: cookieStore.get("subIssue")?.value ?? "",
        detail: cookieStore.get("detail")?.value ?? "",
        location: cookieStore.get("location")?.value ?? "",
        lat: cookieStore.get("lat")?.value ?? "",
        lng: cookieStore.get("lng")?.value ?? "",
        province: cookieStore.get("province")?.value ?? "",
        district: cookieStore.get("district")?.value ?? "",
        locationDescription: cookieStore.get("locationDescription")?.value ?? "",
        additionalNotes: cookieStore.get("additionalNotes")?.value ?? "",
    })
}

