"use client"
import Navbar from "../../../components/navbar";
import UserCard from "../../../components/userform/UserCard"
function Details(){
    return (
       <div className="w-full max-w-sm mx-auto">
        <Navbar/>
        <div className="mx-10">
            <div className="mt-4 mb-4">
                <h1 className="text-2xl font-bold text-[#1A1A2E]">ยืนยันรายละเอียด</h1>
                <p className="text-md text-[#4D4632]">Confirmation</p>
                <p className="text-sm text-[#4D4632]">กรุณาใส่รายละเอียดให้ถูกต้องและครบถ้วน</p>
            </div>
        <UserCard/>
        </div>
       </div>

    )
}
export default Details;
