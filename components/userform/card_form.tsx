"use client"
import React from 'react'
import { MdOutlinePhone } from 'react-icons/md'
import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { prefixOptions } from '../../data/prefix';
import { useState, useEffect } from 'react';
import SearchableDropdown from './serchabledropdown';
import Link from 'next/link';
import { useRouter } from 'next/navigation' 

interface FormErrors {
    prefix: string;
    name: string;
    surname: string;
    phone: string;
}

export default function card_form() {
    const router = useRouter()
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

    const formatPhone = (value: string) => {
    // เอาแค่ตัวเลข
        const numbers = value.replace(/\D/g, "").slice(0, 10);
        // format เป็น xxx-xxx-xxxx
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 6) return `${numbers.slice(0,3)}-${numbers.slice(3)}`;
        return `${numbers.slice(0,3)}-${numbers.slice(3,6)}-${numbers.slice(6)}`;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(formatPhone(e.target.value));
    };

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

    const isNameValid = (n: string) => {
        const nameRegex =   /^[ก-ฮะ-์เ-ไ\s]+$/;
        const spaceRegex = /^\s*$/;
        if (spaceRegex.test(n)) return false; // ตรวจสอบว่าค่าเป็นช่องว่างหรือไม่
        return nameRegex.test(n)
    }

    // ตรวจสอบเบอร์โทรศัพท์
    const isPhoneValid = (phoneNumber: string) => {
        const phoneRegex = /^(06|08|09)\d{1}-\d{3}-\d{4}$/;
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
        if (!name.trim() || name.trim().length === 0) {
            newErrors.name = "กรุณากรอกชื่อ";
        } else if(!isNameValid(name)){
            newErrors.name = "รูปแบบไม่ถูกต้อง";
        }

        // Validate surname
        if (!surname.trim() || surname.trim().length === 0) {
            newErrors.surname = "กรุณากรอกนามสกุล";
        } else if(!isNameValid(surname)){
            newErrors.surname = "รูปแบบไม่ถูกต้อง";
        }

        // Validate phone
        if (!phone.trim() || phone.trim().length === 0) {
            newErrors.phone = "กรุณากรอกเบอร์โทรศัพท์";
        } else if (!isPhoneValid(phone)) {
            newErrors.phone = "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง";
        }

        setErrors(newErrors);
        return Object.values(newErrors).every(error => error === "");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const isValid = validateForm();
        if (isValid) {
            // ถ้าvalidateผ่านให้ไปหน้าถัดไป
            // window.location.href = "/userform/Complaint_Details";
            // console.log("prefix:" + selected)
            // console.log("name:" + name);
            // console.log("surname" + surname)
            // console.log("phone" + phone)

            const cleanPhone = phone.replace(/-/g, "");
            const res = await fetch('/api/form/reporter', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prefix: selected, name: name, surname: surname, phone: cleanPhone }),
            })

            if (res.ok) {
            router.push("/userform/Complaint_Details")
            }
        }
    };

  return (
    <div className='w-full'>
      <form onSubmit={handleSubmit}>
        <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
            {/* คำนำหน้าชื่อ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>คำนำหน้า</p>
                <p className='text-[#4D4632] text-base font-normal'>Title</p>
                <div className="relative w-full mt-1 mb-1">
                    <SearchableDropdown selectedValue={selected} onSelectedChange={setSelected} />
                </div>
                {errors.prefix && <p className='text-red-500 text-sm mb-4'>{errors.prefix}</p>}
            </div>


            {/* ชื่อ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>ชื่อ</p>
                <p className='text-[#4D4632] text-base font-normal'>Name</p>
                <input type="text"
                    placeholder='พิมพ์ชื่อของคุณ (ภาษาไทย)'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660]/50 text-base border-2 ${errors.name ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.name && <p className='text-red-500 text-sm mb-4'>{errors.name}</p>}
            </div>

            {/* นามสกุล */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>นามสกุล</p>
                <p className='text-[#4D4632] text-base font-normal'>Surname</p>
                <input type="text"
                    placeholder='พิมพ์นามสกุลของคุณ (ภาษาไทย)'
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className={`w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-1 py-4 px-4 placeholder:text-[#7F7660]/50 text-base border-2 ${errors.surname ? 'border-red-500' : 'border-transparent'}`}
                />
                {errors.surname && <p className='text-red-500 text-sm mb-4'>{errors.surname}</p>}
            </div>

            {/* เบอร์โทรศัพท์ */}
            <div>
                <p className='text-[#231B00] text-lg font-semibold'>เบอร์โทรศัพท์</p>
                <p className='text-[#4D4632] text-base font-normal'>Phone Number</p>
                <div className={`flex items-center w-full rounded-xl bg-[#F4F4F1]/50 border-2 focus-within:border-black focus-within:ring-1 focus-within:ring-black mt-1 mb-1 ${errors.phone ? 'border-red-500' : 'border-transparent'}`}>
                    <MdOutlinePhone className="text-[#725C00] text-xl shrink-0 mx-3" />
                    <input
                        type="tel"
                        placeholder="08X-XXX-XXXX"
                        value={phone}
                        onChange={handlePhoneChange}
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
              <Link href="/userform/Complaint_Details">
                  <div className='flex items-center justify-center text-xl'>
                    <span className='mr-2'>ถัดไป</span>
                    <span className='text-xl'>
                      <IoMdArrowRoundForward  />
                    </span>
                  </div>
            </Link>
              </button>
          </div>
      </form>
    </div>
  )
}

