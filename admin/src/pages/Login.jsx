import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import axios from 'axios'
import { authDataContext } from '../context/AuthContext';
import { adminDataContext } from '../context/AdminContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from '../component/Loading';

function Login() {
  let [show,setShow] = useState(false)
  let [email,setEmail] = useState("")
  let [password,setPassword] = useState("")
  let {serverUrl} = useContext(authDataContext)
  let {adminData , getAdmin} = useContext(adminDataContext)
  let navigate = useNavigate()
  const [loading,setLoading] = useState(false)

  const AdminLogin = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const result = await axios.post(serverUrl + '/api/auth/adminlogin',{email , password} , {withCredentials:true})
      console.log(result.data)
      toast.success("Admin Login Successfully")
      getAdmin()
      navigate("/")
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Admin Login Failed")
      setLoading(false)
    }
  }

  return (
    <div className='w-screen h-screen bg-slate-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-white p-8 rounded-xl shadow-lg'>
        <div className='flex flex-col items-center mb-8'>
          <img className='w-12 mb-3' src={logo} alt="OneCart Logo" />
          <h1 className='text-2xl font-bold text-slate-800'>OneCart Admin</h1>
          <p className='text-slate-500 mt-1'>Please log in to continue.</p>
        </div>
        
        <form onSubmit={AdminLogin} className='space-y-6'>
          <div className='space-y-2'>
            <label className='text-sm font-medium text-slate-700'>Email Address</label>
            <input 
              type="email" 
              className='w-full h-12 border border-slate-300 rounded-lg px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='admin@onecart.com' 
              required  
              onChange={(e)=>setEmail(e.target.value)} 
              value={email}
            />
          </div>
          <div className='space-y-2 relative'>
            <label className='text-sm font-medium text-slate-700'>Password</label>
            <input 
              type={show ? "text" : "password"} 
              className='w-full h-12 border border-slate-300 rounded-lg px-4 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500' 
              placeholder='••••••••' 
              required 
              onChange={(e)=>setPassword(e.target.value)} 
              value={password}
            />
            <div className='absolute inset-y-0 right-4 top-7 flex items-center'>
                {!show && <IoEyeOutline className='w-5 h-5 text-slate-400 cursor-pointer' onClick={()=>setShow(prev => !prev)}/>}
                {show && <IoEye className='w-5 h-5 text-slate-500 cursor-pointer' onClick={()=>setShow(prev => !prev)}/>}
            </div>
          </div>
          <button 
            type='submit'
            className='w-full h-12 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors flex items-center justify-center disabled:bg-blue-400'
            disabled={loading}
          >
            {loading ? <Loading/> : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;