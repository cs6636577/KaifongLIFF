import { Search } from 'lucide-react'
import React from 'react'

const serchbar = () => {
  return (
    <div>
        {/* search bar */}
        <div className='px-10 pt-10'>
            <div className="relative">
            <Search className="text-[#4D4632] pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <input
                type="search"
                placeholder="ค้นหาสถานที่หรือที่อยู่..."
                className="bg-[#F4F4F1] placeholder:text-[#4D4632]/50 focus-visible:ring-ring h-12 w-full rounded-xl pr-4 pl-12 text-sm"
            />
            </div>
        </div>
    </div>
  )
}

export default serchbar
