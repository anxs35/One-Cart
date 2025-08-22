import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';
import { shopDataContext } from '../context/ShopContext';

function Nav() {
    let {getCurrentUser , userData} = useContext(userDataContext)
    let {serverUrl} = useContext(authDataContext)
    let {showSearch,setShowSearch,search,setSearch,getCartCount} = useContext(shopDataContext)
    let [showProfile,setShowProfile] = useState(false)
    let navigate = useNavigate()


    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout" , {withCredentials:true})
            console.log(result.data)
           getCurrentUser()
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='w-full h-20 bg-white z-50 fixed top-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-slate-200 shadow-sm'>
        {/* Logo and Brand Name */}
        <div className='flex items-center justify-start gap-3 cursor-pointer' onClick={() => navigate("/")}>
            <img src={logo} alt="OneCart Logo" className='w-8' />
            <h1 className='text-2xl text-slate-800 font-bold'>OneCart</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className='hidden md:flex'>
            <ul className='flex items-center justify-center gap-6'>
                <li><button className='text-base font-medium text-slate-600 hover:text-blue-600 transition-colors' onClick={()=>navigate("/")}>HOME</button></li>
                <li><button className='text-base font-medium text-slate-600 hover:text-blue-600 transition-colors' onClick={()=>navigate("/collection")}>COLLECTIONS</button></li>
                <li><button className='text-base font-medium text-slate-600 hover:text-blue-600 transition-colors' onClick={()=>navigate("/about")}>ABOUT</button></li>
                <li><button className='text-base font-medium text-slate-600 hover:text-blue-600 transition-colors' onClick={()=>navigate("/contact")}>CONTACT</button></li>
            </ul>
        </nav>
        
        {/* Actions and Profile */}
        <div className='flex items-center justify-end gap-5 relative'>
            <button onClick={()=>{setShowSearch(prev=>!prev);navigate("/collection")}}>
                {showSearch ? <IoSearchCircleSharp className='w-8 h-8 text-blue-600'/> : <IoSearchCircleOutline className='w-8 h-8 text-slate-600 hover:text-blue-600'/>}
            </button>
            <button className='hidden md:block relative' onClick={()=>navigate("/cart")}>
                <MdOutlineShoppingCart className='w-7 h-7 text-slate-600 hover:text-blue-600'/>
                <span className='absolute flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-semibold -top-2 -right-2'>{getCartCount()}</span>
            </button>
            <button onClick={()=>setShowProfile(prev=>!prev)}>
                {!userData ? <FaCircleUser className='w-7 h-7 text-slate-600 hover:text-blue-600'/> :
                <div className='w-8 h-8 bg-slate-800 text-white rounded-full flex items-center justify-center font-semibold'>{userData?.name.slice(0,1).toUpperCase()}</div>}
            </button>
        </div>
       
       {/* Search Bar Dropdown */}
       {showSearch && <div className='w-full h-20 bg-white/95 backdrop-blur-sm absolute top-full left-0 flex items-center justify-center border-b border-slate-200'>
            <input type="text" className='w-full max-w-lg h-12 bg-slate-100 rounded-full px-6 placeholder:text-slate-500 text-slate-800 text-base border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none' placeholder='Search products...' onChange={(e)=>{setSearch(e.target.value)}} value={search} />
        </div>}

       {/* Profile Dropdown */}
       {showProfile && <div className='absolute w-56 bg-white top-14 right-0 border border-slate-200 rounded-lg shadow-lg z-20'>
            <ul className='flex flex-col text-base py-2 text-slate-700'>
                {!userData && <li className='w-full hover:bg-slate-100 px-4 py-2 cursor-pointer' onClick={()=>{navigate("/login");setShowProfile(false)}}>Login</li>}
                {userData && <li className='w-full hover:bg-slate-100 px-4 py-2 cursor-pointer' onClick={()=>{handleLogout();setShowProfile(false)}}>Log Out</li>}
                <li className='w-full hover:bg-slate-100 px-4 py-2 cursor-pointer' onClick={()=>{navigate("/order");setShowProfile(false)}}>Orders</li>
                <li className='w-full hover:bg-slate-100 px-4 py-2 cursor-pointer' onClick={()=>{navigate("/about");setShowProfile(false)}}>About</li>
            </ul>
        </div>}
        
        {/* Mobile Navigation Bar */}
        <div className='w-full h-20 flex items-center justify-around px-2 fixed bottom-0 left-0 bg-white border-t border-slate-200 md:hidden'>
            <button className='text-slate-600 flex items-center justify-center flex-col gap-1' onClick={()=>navigate("/")}><IoMdHome className='w-7 h-7'/> <span className='text-xs font-medium'>Home</span></button>
            <button className='text-slate-600 flex items-center justify-center flex-col gap-1' onClick={()=>navigate("collection")}><HiOutlineCollection className='w-7 h-7'/> <span className='text-xs font-medium'>Collections</span></button>
            <button className='text-slate-600 flex items-center justify-center flex-col gap-1' onClick={()=>navigate("/contact")}><MdContacts className='w-7 h-7'/> <span className='text-xs font-medium'>Contact</span></button>
            <button className='text-slate-600 flex items-center justify-center flex-col gap-1 relative' onClick={()=>navigate("/cart")}>
                <MdOutlineShoppingCart className='w-7 h-7'/> <span className='text-xs font-medium'>Cart</span>
                <span className='absolute flex items-center justify-center w-5 h-5 bg-blue-600 text-white rounded-full text-xs font-semibold -top-1 right-2'>{getCartCount()}</span>
            </button>
        </div>
    </div>
  )
}

export default Nav
