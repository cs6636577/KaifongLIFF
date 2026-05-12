type EvidenceCardProps = {
  
};
function EvidenceCard(){

    return (
       <div className=" rounded-xl  bg-white p-3 shadow-sm">

           <div className="flex gap-2 m-3 ">
              <div className="w-1.5 h-6 rounded-md bg-[#725C00] mt-3"></div>
              <div className="">
                <p className="text-lg font-bold text-[#1A1A2E]">หลักฐานประกอบ</p>
                <p className="text-sm text-[#4D4632]">Supporting Evidence</p>
              </div>
           </div>

           <div className="flex m-3">
            {/*ไว้ใส่ภาพ ต้องดึงมาจาก form และ backend เก็บเปน? url?*/}
                 <img src={""} className="" alt="คำอธิบายรูปภาพ" ></img>
                 {/*กดปุ่มแล้วจะมีเพิ่มไฟล์รูป สร้างอีกcomponentsแล้ว import มา*/}
                <button className="">
                    

                </button>
           </div>
       </div>

    )
}
export default EvidenceCard;