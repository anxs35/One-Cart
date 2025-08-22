import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const {currency , delivery_fee , getCartAmount} = useContext(shopDataContext)
  return (
    <div className='w-full'>
        <div className='mb-4'>
            <Title text1={'CART'} text2={'TOTALS'}/>
        </div>
        <div className='flex flex-col gap-3 text-base'>
           <div className='flex justify-between text-slate-600'>
              <p>Subtotal</p>
              <p>{currency} {getCartAmount()}.00</p>
            </div>
            <hr className='border-slate-200'/>
             <div className='flex justify-between text-slate-600'>
              <p>Shipping Fee</p>
              <p>{currency} {delivery_fee}</p>
            </div>
            <hr className='border-slate-200'/>
            <div className='flex justify-between text-slate-800 font-bold text-lg'>
              <b>Total</b>
              <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal