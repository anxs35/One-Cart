import React, { useContext, useEffect, useState } from 'react'
import { shopDataContext } from '../context/ShopContext'
import Title from './Title'
import Card from './Card'

function RelatedProduct({category,subCategory,currentProductId }) {

    let {products} = useContext(shopDataContext)
    let [related,setRelated] = useState([])

    useEffect(()=>{
     if(products.length > 0){
        let productsCopy = products.slice()
        productsCopy = productsCopy.filter((item) => category === item.category)
        productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
        productsCopy = productsCopy.filter((item) => currentProductId  !== item._id)
        setRelated(productsCopy.slice(0,4))
     }
    },[products,category,subCategory,currentProductId])
    
  return related.length > 0 ? (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center md:text-left'>
            <Title text1={'RELATED'} text2={'PRODUCTS'}/>
        </div>
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            {related.map((item,index)=>(
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1} />
            ))}
        </div>
    </div>
  ) : null;
}

export default RelatedProduct