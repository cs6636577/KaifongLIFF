"use client"
import React from 'react'
import { MdOutlinePhone } from 'react-icons/md'
import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { prefixOptions } from '../../data/prefix';
import { useState, useEffect } from 'react';
import SearchableDropdown from './serchabledropdown';
import Link from 'next/link';

interface FormErrors {
    prefix: string;
    name: string;
    surname: string;
    phone: string;
}

const card_form = () => {
    const [selected, setSelected] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [surname, setSurname] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");
    const [errors, setErrors] = React.useState<FormErrors>({
        prefix: "",
        name: "",
        surname: "",
        phone: ""
    });

    // Real-time validation
    useEffect(() => {
        validateForm();
    }, [selected, name, surname, phone]); // Removed hasAttemptedSubmit from dependencies

    // ตรวจสอบว่าคำนำหน้าตรงกับในdropdown
    const isPrefixValid = () => {
        if (!selected) return false;
        const spaceRegex = /^\s*$/;
        if (spaceRegex.test(selected)) return false; // ตรวจสอบว่าค่าเป็นช่องว่างหรือไม่
        return prefixOptions.some(opt => opt.value === selected);
    };

    // ตรวจสอบเบอร์โทรศัพท์
    const isPhoneValid = (phoneNumber: string) => {
        // ยอมรับฟอร์แมต 08X-XXX-XXXX หรือ 08XXXXXXXX หรือ 08X XXXXXX
        const phoneRegex = /^\+?[\d\s\-()]{7,20}$/;
        const spaceRegex = /^\s*$/;
        if (spaceRegex.test(phoneNumber)) return false; // ตรวจสอบว่าค่าเป็นช่องว่างหรือไม่
        return phoneRegex.test(phoneNumber.replace(/\s/g, ''));
    };

    // Validate all fields
    const validateForm = () => {
        const newErrors: FormErrors = {
            prefix: "",
            name: "",
            surname: "",
            phone: ""
        };

        // Validate prefix - ต้องตรงกับในdropdown และไม่เป็นช่องว่าง
        if (!selected) {
            newErrors.prefix = "กรุณาเลือกคำนำหน้า";
        } else if (!prefixOptions.some(opt => opt.value === selected)) {
            newErrors.prefix = "คำนำหน้าที่ใส่ไม่ตรงกับรายการในdropdown";
        }

        // Validate name
        if (!name.trim() || name.trim().length === 0 || !/^[^\s]+(\s[^\s]+)*$/.test(name)) {
            newErrors.name = "กรุณากรอกชื่อ";
        }

        // Validate surname
        if (!surname.trim() || surname.trim().length === 0 || !/^[^\s]+(\s[^\s]+)*$/.test(surname)) {
            newErrors.surname = "กรุณากรอกนามสกุล";
        }

        // Validate phone
        if (!phone.trim() || phone.trim().length === 0) {
            newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
        } else if (!isPhoneValid(phone)) {
            newErrors.phone = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (08X-XXX-XXXX หรือ 08XXXXXXXX หรือ)";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // ถ้าvalidateผ่านให้ไปหน้าถัดไป
            window.location.href = "/userform/Complaint_Details";
        }
    };

    // const dropdown = document.getElementById("mySelect") as HTMLSelectElement;

    // function getValue() {
    // const selectedValue = dropdown.value;
    // console.log("Selected value:", selectedValue);
    // }

    // const DropdownComponent: React.FC = () => {
    // const [selected, setSelected] = React.useState<string>("");
    // const dropdown = document.getElementById("GenderSelect") as HTMLSelectElement;
    // dropdown.addEventListener("change", getValue);

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelected(event.target.value);
    // };
    // }

    // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelected(event.target.value);
    // }

    // const TextHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setSelected(event.target.value);
    // }

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit}>
        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
                {/* คำนำหน้าชื่อ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>คำนำหน้า</p>
                <p className='text-[#4D4632] text-sm font-normal'>Title</p>
                <div className="relative w-full mt-1 mb-1">
                    <SearchableDropdown selectedValue={selected} onSelectedChange={setSelected} />
                </div>
                {errors.prefix && <p className='text-red-500 text-sm mb-4'>{errors.prefix}</p>}
            </div>


            {/* ชื่อ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>ชื่อ</p>
                <p className='text-[#4D4632] text-sm font-normal'>Name</p>
                <input type="text"
                    placeholder='พิมพ์ชื่อของคุณ'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660]/50 text-base border-2 ${errors.name ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.name && <p className='text-red-500 text-sm mb-4'>{errors.name}</p>}
            </div>

            {/* นามสกุล */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>นามสกุล</p>
                <p className='text-[#4D4632] text-sm font-normal'>Surname</p>
                <input type="text"
                    placeholder='พิมพ์นามสกุลของคุณ'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className={`w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660]/50 text-base border-2 ${errors.surname ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.surname && <p className='text-red-500 text-sm mb-4'>{errors.surname}</p>}
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>เบอร์โทรศัพท์</p>
                <p className='text-[#4D4632] text-sm font-normal'>Phone Number</p>
                <div className={`flex items-center w-full rounded-xl bg-[#F4F4F1]/50 border-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black mt-1 mb-1 ${errors.phone ? 'border-red-500' : 'border-transparent'}`}>
                    <MdOutlinePhone className="text-[#725C00] text-xl shrink-0 mx-3" />
                    <input
                        type="tel"
                        placeholder="08X-XXX-XXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-transparent w-full placeholder:text-[#7F7660]/50 outline-none py-4 px-2 text-base"
                    />
                </div>
                {errors.phone && <p className='text-red-500 text-sm mb-4'>{errors.phone}</p>}
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
      </form>
    </div>
  )
}

export default card_form
