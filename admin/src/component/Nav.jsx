import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import axios from 'axios'
import { authDataContext } from '../context/AuthContext'
import { adminDataContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

function Nav() {
    let navigate = useNavigate()
    let {serverUrl} = useContext(authDataContext)
    let {getAdmin} = useContext(adminDataContext)

    const logOut = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", {withCredentials:true})
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
    <div className='w-full h-20 bg-white z-30 fixed top-0 flex items-center justify-between px-6 border-b border-slate-200 shadow-sm'>
        <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={()=>navigate("/")}>
            <img src={logo} alt="OneCart Logo" className='w-8'/>
            <h1 className='text-2xl text-slate-800 font-bold'>OneCart <span className='font-normal text-slate-500'>Admin</span></h1>
        </div>
        <button className='text-base font-semibold bg-blue-600 text-white py-2.5 px-6 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors' onClick={logOut}>
            LogOut
        </button>
    </div>
  )
}

export default Nav