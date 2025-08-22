import React, { useContext, useEffect, useState } from 'react'
import Title from '../component/Title'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from '../component/CartTotal';

function Cart() {
    const { products, currency, cartItem ,updateQuantity } = useContext(shopDataContext)
  const [cartData, setCartData] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData); 

  }, [cartItem]);

  return (
    <div className='w-full min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='text-center mt-20 mb-10'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Cart Items */}
        <div className='lg:col-span-2 bg-white p-6 rounded-lg border border-slate-200 space-y-4'>
            {cartData.length > 0 ? cartData.map((item,index)=>{
                const productData = products.find((product) => product._id === item._id);
                if (!productData) return null;
                
                return (
                  <div key={index} className='flex items-center gap-4 border-b border-slate-200 pb-4 last:border-b-0'>
                      <img className='w-24 h-24 rounded-md object-cover' src={productData.image1} alt={productData.name} />
                      
                      <div className='flex-grow flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
                          <div className='space-y-1'>
                              <p className='text-lg font-semibold text-slate-800'>{productData.name}</p>
                              <div className='flex items-center gap-4 text-slate-600'>
                                  <p>{currency} {productData.price}</p>
                                  <p className='w-10 h-10 text-sm font-medium bg-slate-100 rounded-md flex items-center justify-center border border-slate-200'>{item.size}</p>
                              </div>
                          </div>
                          
                          <div className='flex items-center gap-4'>
                              <input type="number" min={1} defaultValue={item.quantity} className='w-16 py-2 text-center text-slate-800 font-semibold bg-white border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500' onChange={(e)=> (e.target.value === ' ' || e.target.value === '0') ? null : updateQuantity(item._id,item.size,Number(e.target.value))} />
                              <button onClick={()=>updateQuantity(item._id,item.size,0)}>
                                  <RiDeleteBin6Line className='text-slate-400 w-6 h-6 hover:text-red-600 transition-colors'/>
                              </button>
                          </div>
                      </div>
                  </div>
                )
            }) : (
              <p className='text-slate-500 text-center py-10'>Your cart is empty.</p>
            )}
        </div>

        {/* Cart Summary */}
        <div className='lg:col-span-1'>
          <div className='bg-white p-6 rounded-lg border border-slate-200 shadow-sm sticky top-24'>
              <CartTotal/>
              <button className='w-full mt-6 text-lg font-semibold bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300' 
                  onClick={() => { if (cartData.length > 0) navigate("/placeorder"); }} 
                  disabled={cartData.length === 0}>
                  PROCEED TO CHECKOUT
              </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart