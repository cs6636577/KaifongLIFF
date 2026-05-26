"use client";
import React, { useState, useEffect } from 'react'
import Navbar from '../../../../components/navbar'
import { Sarabun } from 'next/font/google';
import StepProgressMap from '@/components/userform/step_progressmap';
import { RiMapPin2Fill } from 'react-icons/ri';
import SearchBar from '../../../../components/userform/serchbar'
import { FaCircleCheck } from 'react-icons/fa6';
import Map from '../../../../components/Map'

//font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});

const page = () => {
  const [search, setSearch] = useState("");

    // เพิ่ม handler รับค่าจาก SearchBar
  const handlePlaceSelect = (place: {
    name: string;
    address: string;
    lat: number;
    lng: number;
  }) => {
    setLocation(place.address); // ใส่ที่อยู่ลง input location
    console.log("พิกัด:", place.lat, place.lng);
  };

  useEffect(() => {
    
  })

  return (
    <div className={`${sarabun.className}`}>
      <Navbar/>

    {/* หัวข้อ */}
      <div className='flex flex-col items-start px-8'>
          <p className='text-[#231B00] text-2xl font-bold mt-10'>แผนที่ (Map)</p>
          <p className='text-[#4D4632] text-lg mt-2'>กรุณาเลือกพื้นที่ที่เกิดเหตุร้องทุกข์</p>
      </div>

      <StepProgressMap/>
      
      
    {/* search bar */}
      <SearchBar onPlaceSelect={handlePlaceSelect}/>

    {/* map */}
      <div className='flex flex-col items-start px-8 mt-8'>
          {/* <Image
            src={mapDetail}
            className='w-full h-auto block mx-auto lg:w-50% lg:max-h-150 rounded-2xl'
            alt="Map"
          /> */}
          <Map/>

      {/* Location Card */}
        <div className='bg-white shadow-lg shadow-gray-100 rounded-3xl p-6 w-full mt-6 flex gap-5'>
          <div className='bg-nt px-2 py-2 w-10 h-11 items-center rounded-xl'>
            <RiMapPin2Fill size={22} color='695400'/>
          </div>

        {/* ข้อมูลตำแหน่ง */}
          <div className='flex flex-col'>
            <span className='text-sm font-semibold text-[#4D4632]'>
              ตำแหน่งปัจจุบัน (CURRENT LOCATION)
            </span>
            <span className='pr-15'>
              1123/85 ถ.กตก ต.หญ้าแฝก
              อ.เทืองทุ่ง จ.มหาสมุทร 10240
            </span>

          {/* สถานะความแม่นยำ */}
            <div className='flex flex-row gap-2 text-sm text-status-done bg-[#F0FDF4] rounded-full pl-3 w-57 mt-2'>
              <FaCircleCheck className='mt-1' size='12'/>
              <span>ความแม่นยำสูง (High Accuracy)</span>
            </div>
          </div>
        </div>

        {/* ปุ่มถัดไป */}
          <div className='flex flex-col items-center justify-center w-full mt-5'>
              <button 
                type="submit" 
                  id="next-button" 
                  className='bg-nt text-black rounded-full px-6 py-3 mt-6 font-bold w-100 h-18 shadow-md hover:cursor-pointer hover:bg-nt/70 transition duration-300 ease-in-out flex items-center justify-center space-x-2'
              > 
                <div className='flex items-center justify-center text-xl'>
                  <span className='mr-2'>ยืนยันตำแหน่ง</span>
                </div>
              </button>

            <span className='mb-10 mt-4 text-sm text-[#4D4632]/60'>
              *กรุณาตรวจสอบตำแหน่งให้ชัดเจนก่อนกดปุ่มยืนยัน
            </span>
          </div>
      </div>
    </div>
  )
}

export default page
