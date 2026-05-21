import React from 'react'
import Navbar from '../../../../components/navbar'
import { Sarabun } from 'next/font/google';
import StepProgressMap from '@/components/userform/step_progressmap';

//font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});

const page = () => {
  return (
    <div className={`${sarabun.className}`}>
      <Navbar/>

      <div className='flex flex-col items-start px-8'>
          <p className='text-[#231B00] text-2xl font-bold mt-10'>แผนที่ (Map)</p>
          <p className='text-[#4D4632] text-lg mt-2'>กรุณาเลือกพื้นที่ที่เกิดเหตุร้องทุกข์</p>
      </div>

      <StepProgressMap/>
    </div>
  )
}

export default page
