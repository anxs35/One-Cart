import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import StockNotifications from './StockNotifications'

function Nav({ toggleSidebar }) {
    let navigate = useNavigate()
    let { serverUrl } = useContext(authDataContext)
    let { getAdmin } = useContext(adminDataContext)
    let [isOpen, setIsOpen] = useState(false)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data)
            toast.success("LogOut Successfully")
            getAdmin()
            navigate("/login")

        } catch (error) {
            console.log(error)
            toast.error("LogOut Failed")
        }

    }
    return (
        <div className='w-full h-20 bg-white z-50 fixed top-0 flex items-center justify-between px-4 md:px-6 border-b border-slate-200 shadow-sm'>
            <div className='flex items-center gap-3'>
                <button onClick={toggleSidebar} className='md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </button>
                <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={() => navigate("/")}>
                    <img src={logo} alt="OneCart Logo" className='w-8' />
                    <h1 className='text-xl md:text-2xl text-slate-800 font-bold'>OneCart <span className='font-normal text-slate-500'>Admin</span></h1>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <StockNotifications />
                <button className='text-sm md:text-base font-semibold bg-blue-600 text-white py-2 px-4 md:py-2.5 md:px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors' onClick={logOut}>
                    LogOut
                </button>
            </div>
        </div>
    )
}

export default Nav