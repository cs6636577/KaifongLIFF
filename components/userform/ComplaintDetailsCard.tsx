function ComplaintDetailsCard(){
   const name = "สมชาย" ;
   const lastname = "ใจดีมาก" ;

   const phone = "081-234-5678";

   
    return (
       <div className="w-30 h-30 rounded-lg">

           <div className="flex gap-2 m-3">
              <div className="w-3 h-3 bg-[#725C00]"></div>
                <p className="text-md text-[#1A1A2E]">ข้อมูลผู้แจ้ง</p>
                <p className="text-sm text-[#4D4632]">Reporter Info</p>
           </div>

           <div className="m-3">
                <p className="text-sm text-[#4D4632]">ชื่อ-นามสกุล Full Name</p>
                <p className="text-md text-[#1A1A2E]">{name}{" "}{lastname}</p>  
           </div>

           <div className="m-3">
                <p className="text-sm text-[#4D4632]">เบอร์โทรศัพท์ Phone Number</p>
                <p className="text-md text-[#1A1A2E]">{ "081-234-5678"}</p>  
           </div>


       </div>

    )
}
export default ComplaintDetailsCard;