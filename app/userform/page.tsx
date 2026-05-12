import React from 'react'
import Navbar from '../../components/navbar'
import StepProgress from '../../components/userform/step_progress'
import Cardform from '../../components/userform/card_form'
import Cardpdpa from '../../components/userform/card_pdpa'
import { Sarabun } from 'next/font/google';
import { IoMdArrowRoundForward  } from 'react-icons/io';

//font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});


const page = () => {
  return (
    <div className={`${sarabun.className}`}>
      <Navbar />
      <StepProgress />

      {/* หัวข้อและคำอธิบายของฟอร์ม */}
      <div className='flex flex-col items-start px-8'>
        <p className='text-[#231B00] text-3xl font-bold mt-10'>ข้อมูลผู้แจ้ง</p>
        <p className='text-[#5D5C74] text-xl mt-1 font-semibold'>Reporter Info</p>
        <p className='text-[#4D4632] text-lg mt-2'>กรุณากรอกข้อมูลจริงเพื่อประโยชน์ในการร้องเรียนเรื่อง</p>

        {/* ฟอร์ม */}
        <Cardform />

        {/* ปุ่มถัดไป */}
        <div className='flex items-center justify-center w-full mt-5 mb-10'>
          <button className='bg-nt text-black rounded-full px-6 py-3 mt-6 font-bold w-100 h-18 shadow-md hover:cursor-pointer hover:bg-nt/70 transition duration-300 ease-in-out flex items-center justify-center space-x-2'> 
            <div className='flex items-center justify-center text-xl'>
              <span className='mr-2'>ถัดไป</span>
              <span className='text-xl'>
                <IoMdArrowRoundForward  />
              </span>
            </div>
          </button>
        </div>

        {/* คำเตือนpdpa */}
        <Cardpdpa />
      </div>
    </div>
  )
}

export default page
