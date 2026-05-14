"use client"
import Navbar from "../../../components/navbar";
import UserCard from "../../../components/userform/UserCard"
import { Sarabun } from 'next/font/google';
import { useState,useEffect } from "react";
import ComplaintCard from "../../../components/userform/ComplaintDetailsCard";
import EvidenceCard from "@/components/userform/EvidenceCard";
import StatusCard from "@/components/complaint/StatusCard";
import { FaArrowLeft } from "react-icons/fa";
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

if (!user) return <p>Loading...</p>;
  
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
        <ComplaintCard/>
        <EvidenceCard/>
        <StatusCard/>
        <div className="flex gap-2 justify-center mr-3">
         <div className="mt-1"><FaArrowLeft/></div>
          <a href="/track-complaint/complaint">
          <span className="mb-5 py-3">ย้อนกลับ (Back)</span>
          </a>
        </div>
        </div>

        

       </div>

    )
}
export default Details