"use client"
import Navbar from "../../../components/navbar";
import UserCard from "../../../components/userform/UserCard"
import { Sarabun } from 'next/font/google';
import { useState,useEffect } from "react";
import ComplaintCard from "../../../components/ComplaintDetailsCard";
import EvidenceCard from "@/components/userform/EvidenceCard";
import StepProgress from "@/components/userform/step_progress_3";
import { MdSend } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { usePhotoStore } from "@/hooks/usePhotoStore"

  //font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});

export default function Details(){

type User = {
  name: string;
  lastname: string;
  phone: string;
};

type Detail = {
  issueType: string;
  subIssue: string;
  location: string;
  detail: string;
}

const [user, setUser] = useState<User | null>(null);
const [detail, setDetail] = useState<Detail | null>(null); 
const { photos } = usePhotoStore()

useEffect(() => {
    Promise.all([
        fetch("/api/form/reporter").then(res => res.json()),
        fetch("/api/form/complaint").then(res => res.json()),
    ]).then(([userData, detailData]) => {
        setUser(userData);
        setDetail(detailData);
    });
}, []);

async function handleSubmit() {
  if (!user || !detail) return 
    try {
        // 1. อัพรูปไป Vercel Blob
        const photoUrls = await Promise.all(
    photos.map(async file => {
        const fd = new FormData()
        fd.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: fd
        })

        // log ดูว่า API return อะไรกลับมา
        const text = await res.text()
        console.log("upload response:", text)

        const data = JSON.parse(text)
        return data.url
    })
)

        // 2. POST ข้อมูลทั้งหมดลง DB
        const res = await fetch("/api/complaint2/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name:      user.name,
                lastname:  user.lastname,
                phone:     user.phone,
                issueType: detail.issueType,
                subIssue:  detail.subIssue,
                location:  detail.location,
                detail:    detail.detail,
                photos:    photoUrls,
            })
        })

        const data = await res.json()

        const newTab = window.open("", "_blank")
        newTab?.document.write(`<pre>${JSON.stringify(data, null, 2)}</pre>`)

    } catch (error) {
        console.error("Error:", error)
    }
}


if (!user || !detail) return <p>Loading...</p>;
  
    return (
       <div className={`${sarabun.className} min-h-screen`}>
        <Navbar/>
        <StepProgress/>
        <div className="flex flex-col mx-auto gap-6 max-w-3xl px-5 sm:px-8 ">
            <div className="mt-4">
                <h1 className="text-2xl font-bold text-[#1A1A2E]">ยืนยันรายละเอียด</h1>
                <p className="text-md font-medium text-[#4D4632]/80">Confirmation</p>
                <p className="text-sm font-medium text-[#4D4632]/80">กรุณาใส่รายละเอียดให้ถูกต้องและครบถ้วน</p>
            </div>
        <UserCard
        name={user.name}
        lastname={user.lastname}
         phone={user.phone.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3"
        )}
        />
        <ComplaintCard formData={{
          category: detail.issueType,
          subcategory: detail.subIssue,
          location: detail.location,
          detail: detail.detail,
        }}/>
        <EvidenceCard/>
        {/* ปุ่มยืนยัน*/}
        <div className='flex items-center justify-center w-full mb-4'>
          <button 
            onClick={handleSubmit}
            className='bg-nt text-[#725C00] rounded-full px-6 py-3 mt-6 font-bold w-100 h-14 shadow-xl shadow-[#FF8A65]/35 hover:cursor-pointer hover:bg-nt/70 transition duration-300 ease-in-out flex items-center justify-center space-x-2'> 
            <div className='flex items-center justify-center text-xl'>
              <span className='mr-2 px-3
              '>ยืนยันการแจ้งเหตุ</span>
              <span className='text-xl'>
                <MdSend />
              </span>
            </div>
          </button>
        </div>
        <Link href="/userform/Complaint_Details">
          <div className="flex gap-2 justify-center mr-3 text-link-text font-bold">
          <div className="mt-1"><FaArrowLeft/></div>
            <span className="mb-5">ย้อนกลับแก้ไข (Back)</span>
          </div>
        </Link>
        </div>

        

       </div>

    )

}




