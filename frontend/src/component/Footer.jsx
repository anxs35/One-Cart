import React from 'react'
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();
  return (
    <div className='w-full pb-20 md:pb-0'>
        <div className='w-full bg-slate-100 text-slate-700 border-t border-slate-200'>
            <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8'>
                
                {/* Company Info */}
                <div className='space-y-4'>
                    <div className='flex items-center gap-3'>
                        <img src={logo} alt="OneCart Logo" className='w-10 h-10'/>
                        <p className='text-2xl font-bold text-slate-800'>OneCart</p>
                    </div>
                    <p className='text-slate-600 text-base'>
                        Your all-in-one online shopping destination, offering top-quality products, unbeatable deals, and fast delivery.
                    </p>
                </div>
                
                {/* Company Links */}
                <div className=''>
                    <h3 className='text-lg font-semibold text-slate-800 mb-4'>COMPANY</h3>
                    <ul className='space-y-2'>
                        <li><button onClick={() => navigate("/")} className='text-slate-600 hover:text-blue-600 hover:underline'>Home</button></li>
                        <li><button onClick={() => navigate("/about")} className='text-slate-600 hover:text-blue-600 hover:underline'>About us</button></li>
                        <li><button className='text-slate-600 hover:text-blue-600 hover:underline'>Delivery</button></li>
                        <li><button className='text-slate-600 hover:text-blue-600 hover:underline'>Privacy Policy</button></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className=''>
                    <h3 className='text-lg font-semibold text-slate-800 mb-4'>GET IN TOUCH</h3>
                    <ul className='space-y-2 text-slate-600'>
                        <li>+91-9876543210</li>
                        <li>contact@onecart.com</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className='w-full bg-slate-200 text-slate-600 text-sm text-center py-4'>
            Copyright 2025 © onecart.com - All Rights Reserved
        </div>
    </div>
  )
}

export default Footer