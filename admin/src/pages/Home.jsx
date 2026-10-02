import React, { useState, useContext, useEffect } from 'react'
import StockMigration from '../component/StockMigration'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiSiemens } from "react-icons/si";
import { FaBoxOpen, FaClipboardList } from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

function Home() {
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalOrders, setTotalOrders] = useState(0)
  const { serverUrl } = useContext(authDataContext)

  const fetchCounts = async () => {
    try {
      const products = await axios.get(`${serverUrl}/api/product/list`, {}, { withCredentials: true })
      setTotalProducts(products.data.length)
      const orders = await axios.post(`${serverUrl}/api/order/list`, {}, { withCredentials: true })
      if (orders.data) setTotalOrders(orders.data.length)
    } catch (err) {
      console.error("Failed to fetch counts", err)
    }
  }

  useEffect(() => {
    fetchCounts()
  }, [])

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-slate-800'>Dashboard Overview</h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>

        <div className='bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow'>
          <div>
            <p className='text-slate-500 font-medium mb-1'>Total Products</p>
            <h3 className='text-4xl font-bold text-slate-800'>{totalProducts}</h3>
          </div>
          <div className='w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-600'>
            <FaBoxOpen className='w-7 h-7' />
          </div>
        </div>

        <div className='bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow'>
          <div>
            <p className='text-slate-500 font-medium mb-1'>Total Orders</p>
            <h3 className='text-4xl font-bold text-slate-800'>{totalOrders}</h3>
          </div>
          <div className='w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-purple-600'>
            <MdShoppingCart className='w-7 h-7' />
          </div>
        </div>

      </div>

      <div className='bg-white rounded-xl border border-slate-200 shadow-sm p-6'>
        <h2 className='text-lg font-bold text-slate-800 mb-4'>Quick Actions</h2>
        <StockMigration />
      </div>

    </div>
  )
}

export default Home