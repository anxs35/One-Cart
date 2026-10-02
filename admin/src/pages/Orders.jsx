import React, { useState, useContext, useEffect } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { SiEbox, SiTicktick } from "react-icons/si";
import { toast } from 'react-toastify';

function Orders() {
  let [orders, setOrders] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchAllOrders = async () => {
    try {
      const result = await axios.post(serverUrl + '/api/order/list', {}, { withCredentials: true })
      if (result.data) {
        setOrders(result.data.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch orders")
    }
  }

  const statusHandler = async (e, orderId) => {
    try {
      const result = await axios.post(serverUrl + '/api/order/status', { orderId, status: e.target.value }, { withCredentials: true })
      if (result.data) {
        await fetchAllOrders()
        toast.success("Order status updated")
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to update status")
    }
  }

  useEffect(() => {
    fetchAllOrders()
  }, [])

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-slate-800'>Customer Orders</h1>
      </div>

      <div className='space-y-6'>
        {orders.map((order, index) => (
          <div key={index} className='bg-white rounded-xl shadow-sm border border-slate-200 p-6 transition-all hover:shadow-md'>
            <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-6'>

              {/* Order Items */}
              <div className='space-y-4'>
                <div className="flex items-center gap-2 mb-2">
                  <SiEbox className="text-blue-500 w-5 h-5" />
                  <h3 className='font-semibold text-slate-800'>Order Items</h3>
                </div>
                <div className='bg-slate-50 rounded-lg p-4 space-y-3'>
                  {Array.isArray(order.items) && order.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start text-sm">
                      <span className='font-medium text-slate-700'>{item.name}</span>
                      <span className='text-slate-500'>x{item.quantity} <span className="bg-white px-2 py-0.5 rounded text-xs border ml-1">{item.size}</span></span>
                    </div>
                  ))}
                  <div className='pt-2 mt-2 border-t border-slate-200 flex justify-between items-center'>
                    <span className='text-sm text-slate-500 font-medium'>Items: {order.items?.length || 0}</span>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div>
                <h3 className='font-semibold text-slate-800 mb-3'>Delivery Details</h3>
                <div className='text-sm text-slate-600 space-y-1 bg-white'>
                  <p className='font-medium text-slate-900'>{order.address?.firstName || 'N/A'} {order.address?.lastName || ''}</p>
                  <p>{order.address?.street || 'No Street Address'}</p>
                  <p>{order.address?.city || ''}, {order.address?.state || ''}</p>
                  <p className='font-mono text-slate-500'>{order.address?.pinCode || ''}</p>
                  <div className="mt-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</div>
                  <p>{order.address?.phone || 'N/A'}</p>
                </div>
              </div>

              {/* Status and Payment */}
              <div className='flex flex-col h-full justify-between gap-4'>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className='text-slate-500'>Payment: </span>
                    <span className={`font-medium ${order.payment ? 'text-green-600' : 'text-orange-500'}`}>{order.payment ? 'Paid' : 'Pending'}</span>
                  </div>
                  <div className="text-sm">
                    <span className='text-slate-500'>Method: </span>
                    <span className='font-medium text-slate-800'>{order.paymentMethod}</span>
                  </div>
                  <div className="text-sm">
                    <span className='text-slate-500'>Date: </span>
                    <span className='font-medium text-slate-800'>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-lg font-bold text-slate-800 mt-2">₹ {order.amount.toLocaleString()}</div>
                </div>

                <div className="mt-auto">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1 block">Status</label>
                  <select
                    value={order.status}
                    className='w-full h-10 border border-slate-300 rounded-lg px-3 bg-white text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-400 transition-colors'
                    onChange={(e) => statusHandler(e, order._id)}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Packing">Packing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for delivery">Out for delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className='text-center py-20 bg-white rounded-xl border border-slate-200 shadow-sm'>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <SiTicktick className="w-8 h-8" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders