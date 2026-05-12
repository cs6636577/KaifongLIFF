"use client"
import React from 'react'
import { MdOutlinePhone } from 'react-icons/md'

const card_form = () => {
    const [selected, setSelected] = React.useState<string>("");
    const dropdown = document.getElementById("mySelect") as HTMLSelectElement;

    function getValue() {
    const selectedValue = dropdown.value;
    console.log("Selected value:", selectedValue);
    }

    interface Option {
    label: string;
    value: string | number;
    }

    const options: Option[] = [
        { value: 'girl', label: 'เด็กหญิง' },
        { value: 'boy', label: 'เด็กชาย' },
        { value: 'mr', label: 'นาย' },
        { value: 'mrs', label: 'นาง' },
        { value: 'ms', label: 'นางสาว' },
        { value: 'other', label: 'อื่นๆ' },
    ]

    const DropdownComponent: React.FC = () => {
    const [selected, setSelected] = React.useState<string>("");
    const dropdown = document.getElementById("GenderSelect") as HTMLSelectElement;
    dropdown.addEventListener("change", getValue);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
    };
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(event.target.value);
    }

  return (
    <div className='bg-white shadow-lg shadow-gray-100 rounded-lg p-6 w-full mt-6'>
      <p className='text-[#231B00] text-lg font-semibold'>คำนำหน้า</p>
      <p className='text-[#4D4632] text-sm font-normal'>Title</p>

      <form>

        <div>
            <select value={selected} onChange={handleChange} id="GenderSelect" className='w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-4 py-4 px-4 placeholder:text-black text-base'>
                <option value="" disabled>เลือกคำนำหน้า</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                    {option.label}
                    </option>
                ))}
            </select>
        </div>

        <div>
            <p className='text-[#231B00] text-lg font-semibold'>ชื่อ</p>
            <p className='text-[#4D4632] text-sm font-normal'>Name</p>
            <input type="text" placeholder='พิมพ์ชื่อของคุณ' className='w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-4 py-4 px-4 placeholder:text-[#7F7660]/50 text-base' />
        </div>

        <div>
            <p className='text-[#231B00] text-lg font-semibold'>นามสกุล</p>
            <p className='text-[#4D4632] text-sm font-normal'>Surname</p>
        <input type="text" placeholder='พิมพ์นามสกุลของคุณ' className='w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-4 py-4 px-4 placeholder:text-[#7F7660]/50 text-base' />
        </div>

        <div>
            <p className='text-[#231B00] text-lg font-semibold'>เบอร์โทรศัพท์</p>
            <p className='text-[#4D4632] text-sm font-normal'>Phone Number</p>
            <div className='flex items-center w-full bg-[#F4F4F1]/50 rounded-xl p-2 mt-1 mb-4 py-4 px-4 text-base space-x-2'>
                <MdOutlinePhone className="text-[#725C00] text-xl shrink-0" />

                <input
                    type="text"
                    placeholder="08X-XXX-XXXX"
                    className="
                    bg-transparent
                    w-full
                    placeholder:text-[#7F7660]/50
                    "
                />
            </div>
        </div>
      </form>
    </div>
  )
}

export default card_form
