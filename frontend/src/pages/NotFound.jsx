import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
    let navigate = useNavigate()
  return (
    <div className='w-screen h-screen bg-slate-100 flex items-center justify-center text-center p-4'>
        <div className='flex flex-col items-center gap-6'>
            <h1 className='text-6xl md:text-8xl font-bold text-slate-800'>404</h1>
            <p className='text-xl md:text-2xl text-slate-600'>Page Not Found</p>
            <button className='bg-blue-600 px-8 py-3 rounded-lg text-lg text-white font-semibold cursor-pointer hover:bg-blue-700 transition-colors' onClick={()=>navigate("/")}>
                Go to Homepage
            </button>
        </div>
    </div>
  )
}

export default NotFound