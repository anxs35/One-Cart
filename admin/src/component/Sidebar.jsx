import React from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate()
  return (
    <aside className='w-64 min-h-screen bg-slate-50 border-r border-slate-200 fixed left-0 top-0 pt-20'>
        <div className='flex flex-col gap-2 p-4'>
            <div className='flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors' onClick={()=>navigate('/add')}>
                <IoIosAddCircleOutline className='w-5 h-5'/>
                <p className='font-medium'>Add Items</p>
            </div>
            <div className='flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors' onClick={()=>navigate('/lists')}>
                <FaRegListAlt className='w-5 h-5'/>
                <p className='font-medium'>List Items</p>
            </div>
            <div className='flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors' onClick={()=>navigate('/orders')}>
                <SiTicktick className='w-5 h-5'/>
                <p className='font-medium'>View Orders</p>
            </div>
        </div>
    </aside>
  )
}

export default Sidebar