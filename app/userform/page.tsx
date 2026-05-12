import React from 'react'
import Navbar from '../../components/navbar'
import StepProgress from '../../components/userform/step_progress'

import { Sarabun } from 'next/font/google';

//font sarabun
const sarabun = Sarabun({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],});


const page = () => {
  return (
    <div className={`${sarabun.className}`}>
      <Navbar />
      <StepProgress />
    </div>
  )
}

export default page
