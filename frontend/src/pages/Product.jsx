import React from 'react'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'

function Product() {
  return (
    <div className='w-full bg-white flex items-center justify-start flex-col py-16'>
        <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16'>
            <LatestCollection/>
            <BestSeller/>
        </div>
    </div>
  )
}

export default Product