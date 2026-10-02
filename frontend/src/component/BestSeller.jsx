// BestSeller.jsx
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function BestSeller() {
    let { products } = useContext(shopDataContext)
    let [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        let filterProduct = products.filter((item) => item.bestseller)
        setBestSeller(filterProduct.slice(0, 4));
    }, [products])

    return (
        <div className='w-full'>
            <div className='text-center mb-10'>
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className='max-w-2xl mx-auto text-base md:text-lg text-slate-500 mt-2'>Tried, Tested, Loved – Discover Our All-Time Best Sellers.</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {bestSeller.map((item, index) => (
                    <Card key={index} name={item.name} id={item._id} price={item.price} image={item.image1} stock={item.stock} />
                ))}
            </div>
        </div>
    )
}

export default BestSeller