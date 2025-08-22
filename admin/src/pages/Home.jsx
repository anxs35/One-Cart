import React from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { useState } from 'react'
import { useContext } from 'react'
import { authDataContext } from '../context/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, {withCredentials:true})
      setTotalProducts(products.data.length)
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, {withCredentials:true})
      setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className='w-full min-h-screen bg-slate-100'>
       <Nav/>
       <Sidebar/>
       <main className='pl-64 pt-20'>
         <div className='p-8'>
           <h1 className='text-3xl font-bold text-slate-800 mb-8'>Dashboard</h1>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div className='bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 shadow-sm'>
                <h2 className='text-xl text-slate-600'>Total Products</h2>
                <span className='text-5xl font-bold text-slate-900'>{totalProducts}</span>
              </div>
              <div className='bg-white border border-slate-200 rounded-lg p-6 flex flex-col items-center justify-center gap-4 shadow-sm'>
                <h2 className='text-xl text-slate-600'>Total Orders</h2>
                <span className='text-5xl font-bold text-slate-900'>{totalOrders}</span>
              </div>
           </div>
         </div>
       </main>
    </div>
  )
}

export default Home