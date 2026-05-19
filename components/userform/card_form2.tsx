"use client"
import React from 'react'
import DropDown from '../userform/dropdown'
import { RiMapPin2Fill } from 'react-icons/ri';
import map from '../../public/map/map.png'
import Image from 'next/image'
import { MdOutlineCameraAlt } from 'react-icons/md';
import { IoMdArrowRoundForward } from 'react-icons/io';
import prepage from '../../app/userform/Reporter_Info/page'
import Link from 'next/link'
import { GrWaypoint } from 'react-icons/gr';



const card_form2 = () => {
    const [selected, setSelected] = React.useState<string>("");
    const [selectedSub, setselectedSub] = React.useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
        setselectedSub(event.target.value)
    }

  return (
    <div className='w-full'>
      <form>
        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* ประเภทปัญหา */}
            <p className='text-[#5D5C74] text-lg font-semibold'>ประเภทหมวดปัญหา</p>
            <p className='text-[#4D4632] text-base font-normal mb-2'>Issue Type</p>
            <DropDown selectedValue={selected} onSelectedChange={setSelected} selectedSub={selectedSub} onSubChange={setselectedSub} />
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* รายละเอียดปัญหา */}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>รายละเอียด</p>
                <p className='text-[#4D4632] text-base font-normal mb-1'>Details</p>
                <textarea
                    placeholder='กรุณาระบุรายละเอียดที่พบ...'
                    className="w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660] text-base h-36 align-top"
                />            
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* ปักหมุดสถานที่ */}
            <p className='text-[#5D5C74] text-lg font-semibold'>ตำแหน่งเรื่องร้องทุกข์</p>
            <p className='text-[#4D4632] text-base font-normal mb-2'>Location</p>
            <div className='flex flex-row'>
                <input type="text" placeholder='ระบุสถานที่ หรือ ปักหมุดในแผนที่' className={`w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-8 px-4 placeholder:text-[#7F7660] text-base`}/>
                <button className='bg-nt px-5 py-5 w-15 h-15 items-center rounded-2xl shadow-lg mx-5 mt-1 hover:cursor-pointer'>
                    <RiMapPin2Fill  size={22} color='695400'/>
                </button>
            </div>

            {/* แผนที่ (เดี๋ยวค่อยวางapi) */}
            <div className='bg-[#F4F4F1] rounded-2xl pt-1 overflow-hidden mt-2 relative'> 
                <Image
                    src={map}
                    className='w-full h-40'
                    alt="Picture"
                />
                <button className='absolute bottom-15 left-1/2 -translate-x-1/2 bg-white/80 h-10 rounded-full cursor-pointer'>
                    <div className='flex flex-row items-center justify-center px-4  text-base text-[#725C00]'>
                        <GrWaypoint className='mr-2'/>
                        <span className='text-xs font-semibold tracking-widest'>PIN LOCATION</span>
                    </div>
                </button>
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* อัพโหลดรูปภาพ */}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>รูปภาพ</p>
                <p className='text-[#4D4632] text-base font-normal mb-3'>Photo</p>

                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 bg-neutral-secondary-medium border-dashed border-3 border-[#D1C6AB] rounded-2xl cursor-pointer hover:bg-neutral-tertiary-medium">
                        <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
                            <div className='bg-white px-5 py-5 shadow-md rounded-full mb-5'>
                                <MdOutlineCameraAlt size='30' color='725C00'/>
                            </div>
                            <p className="mb-2 text-lg text-[#5D5C74] font-semibold"><span>Upload รูป</span> (Upload Photo)</p>
                            <p className="text-base text-[#4D4632]">อย่างน้อย 1 รูป (At least 1 photo)</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                </div> 
            </div>
        </div>

        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* รายละเอียดปัญหา */}
            <div>
                <p className='text-[#5D5C74] text-lg font-semibold'>หมายเหตุเพิ่มเติม</p>
                <p className='text-[#4D4632] text-base font-normal mb-2'>Additional Notes</p>
                <input
                    type='text'
                    className="w-full bg-[#F4F4F1] rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660] text-base"
                    placeholder='ข้อมูลอื่นๆ ที่ต้องการแจ้ง...'
                />         
            </div>
        </div>

        {/* ปุ่มถัดไป */}
        <div className='flex items-center justify-center w-full mt-5 mb-10'>
            <button 
                type="submit" 
                id="next-button" 
                className='bg-nt text-black rounded-full px-6 py-3 mt-6 font-bold w-100 h-18 shadow-md hover:cursor-pointer hover:bg-nt/70 transition duration-300 ease-in-out flex items-center justify-center space-x-2'
            > 
                <div className='flex items-center justify-center text-xl'>
                    <span className='mr-2'>ถัดไป</span>
                    <span className='text-xl'>
                        <IoMdArrowRoundForward  />
                    </span>
                </div>
            </button>
        </div>

        {/* ปุ่มย้อนกลับ */}
        <div className='flex items-center justify-center w-full mb-30'>
            <Link href='/userform/Reporter_Info' shallow={false}>
                <p className='text-[#4D4632] font-bold text-lg'>ย้อนกลับ (Back)</p>
            </Link>
        </div>
      </form>
    </div>
  )
}

export default card_form2
