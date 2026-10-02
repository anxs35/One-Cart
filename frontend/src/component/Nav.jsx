import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { IoSearchCircleOutline } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";
import { userDataContext } from '../context/UserContext';
import { IoSearchCircleSharp } from "react-icons/io5";
import { useNavigate, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";
import { FaBars, FaTimes, FaAngleRight } from "react-icons/fa";
import axios from 'axios';
import { authDataContext } from '../context/authContext';
import { shopDataContext } from '../context/ShopContext';
import VisualSearch from './VisualSearch';

function Nav() {
    let { getCurrentUser, userData } = useContext(userDataContext)
    let { serverUrl } = useContext(authDataContext)
    let { showSearch, setShowSearch, search, setSearch, getCartCount } = useContext(shopDataContext)
    let [showProfile, setShowProfile] = useState(false)
    let [visible, setVisible] = useState(false)
    let navigate = useNavigate()
    let location = useLocation()


    const handleLogout = async () => {
        try {
            const result = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            console.log(result.data)
            getCurrentUser()
            navigate("/login")
            setVisible(false)
        } catch (error) {
            console.log(error)
        }
    }

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <div className='w-full h-20 bg-white/95 backdrop-blur-sm z-50 sticky top-0 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-gray-100 shadow-sm transition-all duration-300'>

                <div className='flex items-center gap-4'>


                    {/* Logo and Brand Name */}
                    <div className='flex items-center justify-start gap-3 cursor-pointer group' onClick={() => navigate("/")}>
                        <img src={logo} alt="OneCart Logo" className='w-9 transition-transform duration-300 group-hover:scale-110' />
                        <h1 className='text-2xl text-primary font-bold tracking-tight hidden sm:block'>OneCart</h1>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className='hidden md:flex'>
                    <ul className='flex items-center justify-center gap-8'>
                        {['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'].map((item) => (
                            <li key={item}>
                                <button
                                    className={`text-sm font-medium transition-colors tracking-wide relative group ${isActive(item === 'HOME' ? '/' : `/${item.toLowerCase()}`) ? 'text-accent' : 'text-gray-600 hover:text-accent'}`}
                                    onClick={() => navigate(item === 'HOME' ? '/' : `/${item.toLowerCase()}`)}
                                >
                                    {item}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${isActive(item === 'HOME' ? '/' : `/${item.toLowerCase()}`) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Actions and Profile */}
                <div className='flex items-center justify-end gap-5 relative'>
                    <VisualSearch />
                    <button onClick={() => { setShowSearch(prev => !prev); if (!showSearch) navigate("/collection"); }} className={`hover:scale-110 transition-transform ${showSearch ? 'text-accent' : 'text-gray-600 hover:text-accent'}`}>
                        {showSearch ? <IoSearchCircleSharp className='w-7 h-7' /> : <IoSearchCircleOutline className='w-7 h-7' />}
                    </button>
                    <button className='hidden md:block relative hover:scale-110 transition-transform text-gray-600 hover:text-accent' onClick={() => navigate("/cart")}>
                        <MdOutlineShoppingCart className='w-6 h-6' />
                        <span className='absolute flex items-center justify-center w-4 h-4 bg-accent text-white rounded-full text-[10px] font-bold -top-1.5 -right-1.5 shadow-sm'>{getCartCount()}</span>
                    </button>
                    <button onClick={() => setShowProfile(prev => !prev)} className="hover:scale-110 transition-transform hidden md:block">
                        {!userData ? <FaCircleUser className='w-6 h-6 text-gray-600 hover:text-accent' /> :
                            <div className='w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm shadow-md ring-2 ring-transparent hover:ring-accent/50 transition-all'>{userData?.name.slice(0, 1).toUpperCase()}</div>}
                    </button>
                    {/* Mobile Profile Icon (opens sidebar typically, but keeping explicit sidebar button) */}
                </div>

                {/* Search Bar Dropdown */}
                {showSearch && <div className='w-full py-4 bg-white/95 backdrop-blur-md absolute top-full left-0 flex items-center justify-center border-b border-gray-100 shadow-md animate-in fade-in slide-in-from-top-2'>
                    <input type="text" className='w-full max-w-2xl h-10 bg-gray-50 rounded-full px-6 placeholder:text-gray-400 text-gray-800 text-sm border border-gray-200 focus:ring-2 focus:ring-accent/20 focus:border-accent focus:outline-none transition-all' placeholder='Search for products...' onChange={(e) => { setSearch(e.target.value) }} value={search} autoFocus />
                </div>}

                {/* Desktop Profile Dropdown */}
                {showProfile && <div className='hidden md:block absolute w-48 bg-white top-16 right-4 border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden animate-in fade-in zoom-in-95'>
                    <ul className='flex flex-col text-sm text-gray-700 font-medium'>
                        {!userData && <li className='w-full hover:bg-gray-50 hover:text-accent px-5 py-3 cursor-pointer transition-colors border-b border-gray-50' onClick={() => { navigate("/login"); setShowProfile(false) }}>Login / Sign Up</li>}
                        {userData && <li className='w-full hover:bg-gray-50 hover:text-red-500 px-5 py-3 cursor-pointer transition-colors border-b border-gray-50' onClick={() => { handleLogout(); setShowProfile(false) }}>Log Out</li>}
                        <li className='w-full hover:bg-gray-50 hover:text-accent px-5 py-3 cursor-pointer transition-colors border-b border-gray-50' onClick={() => { navigate("/order"); setShowProfile(false) }}>My Orders</li>
                        <li className='w-full hover:bg-gray-50 hover:text-accent px-5 py-3 cursor-pointer transition-colors' onClick={() => { navigate("/about"); setShowProfile(false) }}>About Us</li>
                    </ul>
                </div>}

                {/* Mobile Navigation Bar */}
                <div className='w-full h-16 flex items-center justify-around px-2 fixed bottom-0 left-0 bg-white/95 backdrop-blur-md border-t border-gray-200 md:hidden z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'>
                    <button className={`flex items-center justify-center flex-col gap-1 w-full h-full ${isActive('/') ? 'text-accent' : 'text-gray-500 hover:text-accent'}`} onClick={() => navigate("/")}><IoMdHome className='w-6 h-6' /> <span className='text-[10px] font-medium uppercase tracking-wide'>Home</span></button>
                    <button className={`flex items-center justify-center flex-col gap-1 w-full h-full ${isActive('/collection') ? 'text-accent' : 'text-gray-500 hover:text-accent'}`} onClick={() => navigate("/collection")}><HiOutlineCollection className='w-6 h-6' /> <span className='text-[10px] font-medium uppercase tracking-wide'>Shop</span></button>
                    <button className={`flex items-center justify-center flex-col gap-1 w-full h-full ${isActive('/contact') ? 'text-accent' : 'text-gray-500 hover:text-accent'}`} onClick={() => navigate("/contact")}><MdContacts className='w-6 h-6' /> <span className='text-[10px] font-medium uppercase tracking-wide'>Contact</span></button>
                    <button className={`flex items-center justify-center flex-col gap-1 relative w-full h-full ${isActive('/cart') ? 'text-accent' : 'text-gray-500 hover:text-accent'}`} onClick={() => navigate("/cart")}>
                        <MdOutlineShoppingCart className='w-6 h-6' /> <span className='text-[10px] font-medium uppercase tracking-wide'>Cart</span>
                        <span className='absolute flex items-center justify-center w-4 h-4 bg-accent text-white rounded-full text-[10px] font-bold top-2 right-[25%] shadow-sm'>{getCartCount()}</span>
                    </button>
                    <button className='flex items-center justify-center flex-col gap-1 w-full h-full text-gray-500 hover:text-accent' onClick={() => setVisible(true)}><FaBars className='w-6 h-6' /> <span className='text-[10px] font-medium uppercase tracking-wide'>Menu</span></button>
                </div>
            </div>

            {/* Mobile Sidebar Menu (Left Side Slide-in) */}
            <div className={`fixed inset-0 z-[100] bg-black/50 transition-opacity duration-300 md:hidden ${visible ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setVisible(false)}>
                <div className={`absolute top-0 left-0 bottom-0 w-[75%] max-w-sm bg-white shadow-xl transition-transform duration-300 transform ${visible ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
                    <div className='flex items-center justify-between p-6 border-b border-gray-100'>
                        <div className='flex items-center gap-2'>
                            <img src={logo} alt="Logo" className='w-8' />
                            <h2 className='text-xl font-bold text-slate-800'>Menu</h2>
                        </div>
                        <button onClick={() => setVisible(false)} className='p-2 hover:bg-slate-50 rounded-full transition-colors'>
                            <FaTimes className='w-6 h-6 text-slate-500' />
                        </button>
                    </div>

                    <div className='flex flex-col p-6 space-y-2'>
                        {/* Main Links */}
                        <button onClick={() => { setVisible(false); navigate("/") }} className={`flex items-center justify-between w-full py-3 px-2 rounded-lg transition-colors ${isActive('/') ? 'bg-blue-50 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            HOME <FaAngleRight className='text-xs opacity-50' />
                        </button>
                        <button onClick={() => { setVisible(false); navigate("/collection") }} className={`flex items-center justify-between w-full py-3 px-2 rounded-lg transition-colors ${isActive('/collection') ? 'bg-blue-50 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            COLLECTION <FaAngleRight className='text-xs opacity-50' />
                        </button>
                        <button onClick={() => { setVisible(false); navigate("/about") }} className={`flex items-center justify-between w-full py-3 px-2 rounded-lg transition-colors ${isActive('/about') ? 'bg-blue-50 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            ABOUT US <FaAngleRight className='text-xs opacity-50' />
                        </button>
                        <button onClick={() => { setVisible(false); navigate("/contact") }} className={`flex items-center justify-between w-full py-3 px-2 rounded-lg transition-colors ${isActive('/contact') ? 'bg-blue-50 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            CONTACT <FaAngleRight className='text-xs opacity-50' />
                        </button>

                        <div className='h-px bg-gray-100 my-2'></div>

                        {/* User Actions */}
                        <button onClick={() => { setVisible(false); navigate("/order") }} className={`flex items-center justify-between w-full py-3 px-2 rounded-lg transition-colors ${isActive('/order') ? 'bg-blue-50 text-accent font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>
                            MY ORDERS <FaAngleRight className='text-xs opacity-50' />
                        </button>

                        {!userData ? (
                            <button onClick={() => { setVisible(false); navigate("/login") }} className='w-full py-3 px-2 text-left text-slate-600 hover:text-accent font-medium'>
                                LOGIN / SIGNUP
                            </button>
                        ) : (
                            <button onClick={handleLogout} className='w-full py-3 px-2 text-left text-red-500 hover:text-red-600 font-medium'>
                                LOGOUT
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav