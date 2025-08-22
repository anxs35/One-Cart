import React from 'react'
import Title from '../component/Title'
import contact from "../assets/contact.jpg"
import NewLetterBox from '../component/NewLetterBox'

function Contact() {
  return (
    <div className='w-full min-h-screen bg-white pt-24 pb-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
            <Title  text1={'CONTACT'} text2={'US'}/>
        </div>
        
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <div className='flex items-center justify-center'>
              <img src={contact} alt="Contact Us" className='w-full max-w-lg rounded-lg shadow-md'/>
            </div>
            
            <div className='space-y-6 text-slate-700'>
                <div>
                    <h3 className='text-xl font-bold text-slate-800 mb-2'>Our Store</h3>
                    <div className='text-base space-y-1 text-slate-600'>
                        <p>12345 Random Station</p>
                        <p>Random City, State, India</p>
                    </div>
                </div>
                <div>
                    <div className='text-base space-y-1 text-slate-600'>
                        <p>Tel: +91-9876543210</p>
                        <p>Email: admin@onecart.com</p>
                    </div>
                </div>
                <div className='pt-4'>
                    <h3 className='text-xl font-bold text-slate-800 mb-2'>Careers at OneCart</h3>
                    <p className='text-base text-slate-600 mb-4'>Learn more about our teams and job openings.</p>
                    <button className='px-6 py-3 flex items-center justify-center text-blue-600 bg-white border-2 border-blue-600 font-semibold hover:bg-blue-50 active:bg-blue-100 rounded-lg transition-colors'>
                        Explore Jobs
                    </button>
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

export default Contact