import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox } from "react-icons/si";

function Orders() {
  let [orders,setOrders] = useState([])
  let {serverUrl} = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list' , {} ,{withCredentials:true})
      setOrders(result.data.reverse())
    } catch (error) {
      console.log(error)
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', {orderId, status:e.target.value}, {withCredentials:true})
      if(result.data){
        await fetchAllOrders()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchAllOrders()
  },[])

  return (
    <div className='w-full min-h-screen bg-slate-100'>
      <Nav/>
      <Sidebar/>
      <main className='pl-64 pt-20'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold text-slate-800 mb-8'>Customer Orders</h1>
          <div className='space-y-6'>
            {orders.map((order, index) => (
              <div key={index} className='bg-white rounded-lg shadow-sm border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-4 gap-6'>
                <div className='md:col-span-2'>
                  <p className='font-semibold text-slate-800 mb-2'>Order Items</p>
                  <div className='text-sm text-slate-600 space-y-1'>
                    {order.items.map((item, i) => (
                      <p key={i}>{item.name} x {item.quantity} (Size: {item.size})</p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className='font-semibold text-slate-800 mb-2'>Shipping Address</p>
                  <div className='text-sm text-slate-600'>
                    <p>{order.address.firstName} {order.address.lastName}</p>
                    <p>{order.address.street}</p>
                    <p>{order.address.city}, {order.address.state} - {order.address.pinCode}</p>
                    <p>{order.address.phone}</p>
                  </div>
                </div>

                <div className='space-y-4'>
                  <div className='text-sm'>
                    <p><b>Items:</b> {order.items.length}</p>
                    <p><b>Payment:</b> {order.payment ? 'Done' : 'Pending'} ({order.paymentMethod})</p>
                    <p><b>Date:</b> {new Date(order.date).toLocaleDateString()}</p>
                    <p className='text-lg font-bold text-slate-900 mt-2'>₹ {order.amount}</p>
                  </div>
                  <select value={order.status} className='w-full h-11 border border-slate-300 rounded-lg px-3 bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500' onChange={(e)=>statusHandler(e,order._id)}>
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
             {orders.length === 0 && (
              <div className='text-center text-slate-500 py-20 bg-white rounded-lg border border-slate-200'>No orders found.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Orders