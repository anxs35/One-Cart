import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { FiUsers } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function Sidebar({ closeSidebar }) {
    let navigate = useNavigate()

    const handleNavigation = (path) => {
        navigate(path);
        if (closeSidebar) closeSidebar();
    }

    return (
        <aside className='w-full h-full bg-white'>
            <div className='flex flex-col gap-2 p-4'>
                <div className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors' onClick={() => handleNavigation('/add')}>
                    <IoIosAddCircleOutline className='w-6 h-6' />
                    <p className='font-medium'>Add Items</p>
                </div>
                <div className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors' onClick={() => handleNavigation('/lists')}>
                    <FaRegListAlt className='w-5 h-5' />
                    <p className='font-medium'>List Items</p>
                </div>
                <div className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors' onClick={() => handleNavigation('/orders')}>
                    <SiTicktick className='w-5 h-5' />
                    <p className='font-medium'>View Orders</p>
                </div>
                <div className='flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors' onClick={() => handleNavigation('/users')}>
                    <FiUsers className='w-5 h-5' />
                    <p className='font-medium'>Manage Users</p>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar