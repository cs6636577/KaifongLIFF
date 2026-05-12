import { RiMapPin2Line } from "react-icons/ri";
type ComplaintCardProps = {
  
};
function ComplaintCard(){
    
    return (
       <div className=" rounded-xl  bg-white p-3 shadow-sm">

           <div className="flex gap-2 m-3 ">
              <div className="w-1.5 h-6 rounded-md bg-[#725C00] mt-3"></div>
              <div className="">
                <p className="text-lg font-bold text-[#1A1A2E]">รายละเอียดคำร้อง</p>
                <p className="text-sm text-[#4D4632]">Complaint Details</p>
              </div>
           </div>

           <div className="flex m-3">
               <div className="">
                    <div className="bg-[#725C00] w-5 h-5"></div>
                         <div className="flex gap-2">
                         <p className="text-sm font-bold text-[#4D4632]/60">หัวข้อปัญหา</p>
                         <p className="text-[10px] text-[#4D4632]/60 mt-1">Problem Category</p>
                    </div>
                   <div className="text-md font-bold">{"ขยะมูลฝอยและสิ่งปฎิกูล"}</div>
               </div>
           </div>

           <div className="m-3">
                <span className="text-sm font-bold text-[#4D4632]/60">สถานที่เกิดเหตุ</span>
                <span className="px-2 text-[10px] text-[#4D4632]/60">Location</span>
                <div className="flex gap-2">
                <RiMapPin2Line className="w-9 h-6"/>
                <span className="text-md text-[#1A1A2E] font-semibold">{"ซอยสุขุมวิท 23 แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร"}</span>  
                </div>
           </div>

           <div className="m-3">
                <span className="text-sm font-bold text-[#4D4632]/60">คำอธิบายเพิ่มเติม</span>
                <span className="px-2 text-[10px] text-[#4D4632]/60">Additional Details</span>
                <p className="text-md text-[#1A1A2E] font-semibold">{'พบกองขยะขนาดใหญ่ส่งกลิ่นเหม็นรบกวนบริเวณหน้าปากซอย มีหนูและแมลงสาบจำนวนมาก ต้องการให้เจ้าหน้าที่เข้ามาดำเนินการจัดเก็บโดยเร็ว'}</p>  
           </div>

           


       </div>

    )
}
export default ComplaintCard;