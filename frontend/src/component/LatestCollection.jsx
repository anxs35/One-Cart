// LatestCollection.jsx
import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { shopDataContext } from '../context/ShopContext'
import Card from './Card'

function LatestCollection() {
  let { products } = useContext(shopDataContext)
  let [latestProducts, setLatestProducts] = useState([])

  useEffect(() => {
    setLatestProducts(products.slice(0, 8));
  }, [products])

  return (
    <div className='w-full'>
      <div className='text-center mb-10'>
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className='max-w-2xl mx-auto text-base md:text-lg text-slate-500 mt-2'>Step Into Style – New Collection Dropping This Season!</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
          <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} stock={item.stock} />
        ))}
      </div>
    </div>
  )
}

export default LatestCollection