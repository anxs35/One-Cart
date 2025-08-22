import React, { useContext } from 'react'
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'

function Card({name, image, id, price}) {
    let {currency} = useContext(shopDataContext)
    let navigate = useNavigate()
  return (
    <div className='w-full max-w-sm bg-white border border-slate-200 rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col cursor-pointer group' onClick={()=>navigate(`/productdetail/${id}`)}>
        <div className='w-full h-64 overflow-hidden rounded-t-lg'>
            <img src={image} alt={name} className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'/>
        </div>
        <div className='p-4 flex-grow flex flex-col'>
            <h3 className='text-slate-800 text-lg font-semibold flex-grow'>{name}</h3>
            <p className='text-slate-600 text-base mt-2'>{currency} {price}</p>
        </div>
    </div>
  )
}

export default Card