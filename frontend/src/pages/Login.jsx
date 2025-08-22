import React from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from '../assets/google.png'
import { IoEyeOutline } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useState } from 'react';
import { useContext } from 'react';
import { authDataContext } from '../context/authContext';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';
import Loading from '../component/Loading';

function Login() {
    let [show,setShow] = useState(false)
        let [email,setEmail] = useState("")
        let [password,setPassword] = useState("")
        let {serverUrl} = useContext(authDataContext)
        let {getCurrentUser} = useContext(userDataContext)
        let [loading,setLoading] = useState(false)

    let navigate = useNavigate()

    const handleLogin = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            let result = await axios.post(serverUrl + '/api/auth/login',{
                email,password
            },{withCredentials:true})
            console.log(result.data)
            setLoading(false)
            getCurrentUser()
            navigate("/")
            toast.success("User Login Successful")
            
        } catch (error) {
            console.log(error)
            toast.error("User Login Failed")
        }
    }
     const googlelogin = async () => {
            try {
                const response = await signInWithPopup(auth , provider)
                let user = response.user
                let name = user.displayName;
                let email = user.email
    
                const result = await axios.post(serverUrl + "/api/auth/googlelogin" ,{name , email} , {withCredentials:true})
                console.log(result.data)
                getCurrentUser()
            navigate("/")
    
            } catch (error) {
                console.log(error)
            }
            
        }
  return (
    <div className='w-full min-h-screen bg-slate-100 text-slate-900 flex flex-col items-center justify-center p-4'>
        <div className='absolute top-0 left-0 w-full h-20 flex items-center px-8'>
            <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={()=>navigate("/")}>
                <img className='w-10' src={Logo} alt="OneCart Logo" />
                <h1 className='text-2xl font-bold text-slate-800'>OneCart</h1>
            </div>
        </div>

        <div className='w-full max-w-md bg-white p-8 md:p-10 rounded-xl shadow-lg'>
            <div className='text-center mb-8'>
                <h2 className='text-3xl font-bold text-slate-800'>Log In</h2>
                <p className='text-slate-600 mt-2'>Welcome back to OneCart.</p>
            </div>
            
            <form onSubmit={handleLogin} className='w-full flex flex-col gap-5'>
                <button type="button" onClick={googlelogin} className='w-full h-12 border border-slate-300 rounded-lg flex items-center justify-center gap-3 text-slate-700 font-medium hover:bg-slate-50 transition-colors'>
                    <img src={google} alt="Google" className='w-5'/> Login with Google
                </button>

                <div className='w-full flex items-center gap-4'>
                    <div className='flex-grow h-px bg-slate-200'></div>
                    <span className='text-slate-500 text-sm'>OR</span>
                    <div className='flex-grow h-px bg-slate-200'></div>
                </div>
                
                <div className='w-full flex flex-col gap-4 relative'>
                    <input type="email" className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Email Address' required onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    
                    <div className='relative w-full'>
                        <input type={show ? "text" : "password"} className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Password' required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                        <div className='absolute inset-y-0 right-4 flex items-center'>
                            {!show && <IoEyeOutline className='w-5 h-5 text-slate-400 cursor-pointer' onClick={()=>setShow(prev => !prev)}/>}
                            {show && <IoEye className='w-5 h-5 text-slate-500 cursor-pointer' onClick={()=>setShow(prev => !prev)}/>}
                        </div>
                    </div>
                  
                    <button className='w-full h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center mt-2 text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-blue-300' disabled={loading}>
                        {loading ? <Loading/> : "Login"}
                    </button>
                    
                    <p className='text-center text-sm text-slate-600 mt-4'>
                        Don't have an account? <span className='text-blue-600 font-semibold cursor-pointer hover:underline' onClick={()=>navigate("/signup")}>Create Account</span>
                    </p>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login