import React from 'react'
import '../../app/globals.css'
import { BiSolidUser } from "react-icons/bi";


const step_progress = () => {
  return (
    <div>
      {/* active step1 */}
      <span className="bg-nt text-[#231B00] rounded-full w-10 h-10 flex items-center justify-center border-3 border-white shadow-md">
        <BiSolidUser/>
      </span>

      {/* line between step1 and step2 */}
      <hr className="border-[#D1C6AB] border-t-2 mx-2 w-30"/>

      {/* inactive step2 */}
      <span className="bg-[#E2E3E0] text-[#7F7660] rounded-full w-10 h-10 flex items-center justify-center border-3 border-white/5 shadow-md">
        <BiSolidUser/>
      </span>
    </div>
  )
}

export default step_progress
