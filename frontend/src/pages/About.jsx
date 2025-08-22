import React from 'react'
import Title from '../component/Title'
import about from '../assets/about.jpg'
import NewLetterBox from '../component/NewLetterBox'

function About() {
  return (
    <div className='w-full min-h-screen bg-white pt-24 pb-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <Title text1={'ABOUT'} text2={'US'}/>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div className='flex items-center justify-center'>
            <img src={about} alt="About OneCart" className='w-full max-w-lg rounded-lg shadow-md' />
          </div>
          <div className='space-y-6 text-slate-600 text-base'>
            <p>
              OneCart was born for smart, seamless shopping—created to deliver quality products, trending styles, and everyday essentials in one place. With reliable service, fast delivery, and great value, OneCart makes your online shopping experience simple, satisfying, and stress-free.
            </p>
            <p>
              Modern shoppers—combining style, convenience, and affordability. Whether it’s fashion, essentials, or trends, we bring everything you need to one trusted platform with fast delivery, easy returns, and a customer-first shopping experience you’ll love.
            </p>
            <h3 className='text-xl font-bold text-slate-800 pt-4'>Our Mission</h3>
            <p>
              Our mission is to redefine online shopping by delivering quality, affordability, and convenience. OneCart connects customers with trusted products and brands, offering a seamless, customer-focused experience that saves time, adds value, and fits every lifestyle and need.
            </p>
          </div>
        </div>
        
        <div className='mt-24 text-center'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left'>
            <div className='bg-slate-50 border border-slate-200 p-8 rounded-lg space-y-3'>
              <h4 className='text-xl font-semibold text-slate-800'>Quality Assurance</h4>
              <p className='text-slate-600'>We guarantee quality through strict checks, reliable sourcing, and a commitment to customer satisfaction always.</p>
            </div>
            <div className='bg-slate-50 border border-slate-200 p-8 rounded-lg space-y-3'>
              <h4 className='text-xl font-semibold text-slate-800'>Convenience</h4>
              <p className='text-slate-600'>Shop easily with fast delivery, simple navigation, secure checkout, and everything you need in one place.</p>
            </div>
            <div className='bg-slate-50 border border-slate-200 p-8 rounded-lg space-y-3'>
              <h4 className='text-xl font-semibold text-slate-800'>Exceptional Customer Service</h4>
              <p className='text-slate-600'>Our dedicated support team ensures quick responses, helpful solutions, and a smooth shopping experience every time.</p>
            </div>
          </div>
        </div>
        
        <div className='mt-24'>
          <NewLetterBox/>
        </div>
      </div>
    </div>
  )
}

export default About