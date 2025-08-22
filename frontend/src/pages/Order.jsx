import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'

function Order() {
    let [orderData,setOrderData] = useState([])
    let {currency} = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)

    const loadOrderData = async () => {
       try {
      const result = await axios.post(serverUrl + '/api/order/userorder',{},{withCredentials:true})
      if(result.data){
        let allOrdersItem = []
        result.data.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse())
      }
    } catch (error) {
      console.log(error)
    }
    }

useEffect(()=>{
 loadOrderData()
},[])


  return (
    <div className='w-full min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='text-center mt-20 mb-10'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      
      <div className='max-w-6xl mx-auto space-y-6'>
        {orderData.length > 0 ? (
          orderData.map((item,index)=>(
            <div key={index} className='w-full bg-white border border-slate-200 rounded-lg shadow-sm p-4 flex flex-col md:flex-row items-start gap-6'>
                <img src={item.image1} alt={item.name} className='w-full md:w-36 h-36 object-cover rounded-md flex-shrink-0'/>
                
                <div className='flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 w-full'>
                    {/* Column 1: Product Info */}
                    <div className='md:col-span-2 space-y-2'>
                        <p className='text-xl font-semibold text-slate-800'>{item.name}</p>
                        <div className='flex items-center flex-wrap gap-x-6 gap-y-2 text-slate-600'>
                            <p className='text-md'>{currency} {item.price}</p>
                            <p className='text-md'>Quantity: {item.quantity}</p>
                            <p className='text-md'>Size: {item.size}</p>
                        </div>
                        <div className='text-slate-600'>
                            <p className='text-md'>Date: <span className='font-medium text-slate-700 ml-2'>{new Date(item.date).toDateString()}</span></p>
                        </div>
                        <div className='text-slate-600'>
                            <p className='text-md'>Payment Method: <span className='font-medium text-slate-700 ml-2'>{item.paymentMethod}</span></p>
                        </div>
                    </div>

                    {/* Column 2: Status & Actions */}
                    <div className='flex flex-col items-start md:items-end justify-between gap-4'>
                        <div className='flex items-center gap-2'>
                          <span className='w-2.5 h-2.5 rounded-full bg-green-500'></span> 
                          <p className='text-md font-medium text-green-800 capitalize'>{item.status}</p>
                        </div>
                        <button className='px-4 py-2 rounded-md bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors' onClick={loadOrderData}>
                          Track Order
                        </button>
                    </div>
                </div>
            </div>
         ))
        ) : (
          <div className='text-center py-20 bg-white rounded-lg border border-slate-200'>
            <p className='text-xl text-slate-500'>You have no past orders.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order