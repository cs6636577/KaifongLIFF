"use client"
import Navbar from "../../../components/navbar";
import UserCard from "../../../components/userform/UserCard"
import { Sarabun } from 'next/font/google';
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense  } from "react";
import ComplaintCard from "../../../components/ComplaintDetailsCard";
import EvidenceCard from "@/components/userform/EvidenceCard";
import StatusCard from "@/components/complaint/StatusCard";
import { FaArrowLeft } from "react-icons/fa";
import type { ServiceRequest } from "@/lib/requests.types";
  //font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});

function Details(){
    
type User = {
  name: string;
  lastname: string;
  phone: string;
};

const [user, setUser] = useState<User | null>(null);

useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      });
}, []);

/*สำหรับหน้ารายละเอียดข้อมูลหลังกดcardเฉพาะตัว*/
const searchParams = useSearchParams();
const id = searchParams.get("id");
const [request, setRequest] = useState<ServiceRequest | null>(null);
useEffect(() => {
    if (!id) return;
    fetch(`/api/requests/${id}`)
      .then(r => r.json())
      .then(setRequest);
}, [id]);


if (!user || !request) return (
  <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#725C00]/20 border-t-[#725C00]" />
    <p className="text-sm font-medium text-[#725C00]">กำลังโหลด...</p>
  </div>
);
  

    return (
       <div className={`${sarabun.className} min-h-screen`}>
        <Navbar/>
        <div className="flex flex-col mx-auto gap-6 max-w-3xl px-5 sm:px-8 ">
            <div className="mt-4">
                <h1 className="text-2xl font-bold text-[#1A1A2E]">รายละเอียดงาน</h1>
                <p className="text-md font-medium text-[#4D4632]/80">Confirmation</p>
                
            </div>
        <UserCard
        name={user.name}
        lastname={user.lastname}
         phone={user.phone.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3"
        )}
        />
        <ComplaintCard  request={request}/>
        <EvidenceCard/>
        <StatusCard
         request={request}
        />
        
         <a href="/track-complaint/complaint">
          <div className="flex gap-6 justify-center mr-3 text-link-text font-bold">
          <div className="mt-1"><FaArrowLeft/></div>
            <span className="mb-5">ย้อนกลับ (Back)</span>
          </div>
        </a>

        </div>

        

       </div>

    )
}
export default Details