import React from 'react'
import Title from './Title'
import { RiExchangeFundsLine } from "react-icons/ri";
import { TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";

function OurPolicy() {
  return (
    <div className='w-full bg-white py-16 sm:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
            <Title text1={"OUR"} text2={"POLICY"}/>
            <p className='mt-3 max-w-3xl mx-auto text-lg text-slate-500'>
              Customer-Friendly Policies – Committed to Your Satisfaction and Safety.
            </p>
        </div>
        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-center'>
          <div className='flex flex-col items-center gap-4'>
            <RiExchangeFundsLine className='w-12 h-12 text-blue-600'/>
            <h3 className='text-xl font-semibold text-slate-800'>Easy Exchange Policy</h3>
            <p className='text-base text-slate-600'>Exchange Made Easy – Quick, Simple, and Customer-Friendly Process.</p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <TbRosetteDiscountCheckFilled className='w-12 h-12 text-blue-600'/>
            <h3 className='text-xl font-semibold text-slate-800'>7 Days Return Policy</h3>
            <p className='text-base text-slate-600'>Shop with Confidence – 7 Days Easy Return Guarantee.</p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <BiSupport className='w-12 h-12 text-blue-600'/>
            <h3 className='text-xl font-semibold text-slate-800'>Best Customer Support</h3>
            <p className='text-base text-slate-600'>Trusted Customer Support – Your Satisfaction Is Our Priority.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurPolicy