import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { shopDataContext } from '../context/ShopContext'
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import RelatedProduct from '../component/RelatedProduct';
import Loading from '../component/Loading';

function ProductDetail() {
    let {productId} = useParams()
    let {products,currency ,addtoCart ,loading} = useContext(shopDataContext)
    let [productData,setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')
    const [activeTab, setActiveTab] = useState('description');

   const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage1(item.image1)
        setImage2(item.image2)
        setImage3(item.image3)
        setImage4(item.image4)
        setImage(item.image1)
        setSize(item.sizes[0] || ''); // Set a default size
        return null;
      }
    })
  }

  useEffect(() => {
    fetchProductData()
     window.scrollTo(0, 0);
  }, [productId, products])

  return productData ? (
    <div className='bg-white pt-24 pb-16 font-sans'>
      {/* Main Product Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          
          {/* Image Gallery */}
          <div className='flex flex-col items-center'>
            <div className='w-full aspect-square border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center'>
              <img src={image} alt={productData.name} className='w-full h-full object-cover text-slate-500' />
            </div>
            <div className='flex items-center justify-center gap-4 mt-4'>
              {[image1, image2, image3, image4].map((thumb, index) => (
                thumb && <div key={index} className={`w-20 h-20 border-2 rounded-md cursor-pointer transition-all ${image === thumb ? 'border-blue-500' : 'border-slate-200 hover:border-slate-400'}`}>
                  <img src={thumb} alt={`Thumbnail ${index + 1}`} className='w-full h-full object-cover rounded-sm' onClick={() => setImage(thumb)} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className='flex flex-col'>
            <h1 className='text-3xl md:text-4xl font-bold text-slate-800'>{productData.name}</h1>
            <div className='flex items-center gap-2 mt-3'>
              <div className='flex items-center text-yellow-400'>
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfAlt />
              </div>
              <p className='text-sm text-slate-500 hover:underline cursor-pointer'>(124 reviews)</p>
            </div>
            
            <p className='text-3xl font-semibold text-slate-900 my-4'>{currency} {productData.price}</p>
            <p className='text-slate-600 leading-relaxed'>{productData.description || "Stylish, breathable cotton shirt with a modern slim fit. Easy to wash, super comfortable, and designed for effortless style."}</p>
            
            <div className='my-6'>
              <p className='text-lg font-semibold text-slate-700 mb-2'>Select Size</p>
              <div className='flex flex-wrap gap-3'>
                {productData.sizes.map((item, index) => (
                  <button key={index} className={`border rounded-md py-2 px-4 font-medium transition-colors ${item === size ? 'bg-slate-900 text-white border-slate-900' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`} onClick={() => setSize(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button className='w-full h-12 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-blue-300 flex items-center justify-center' onClick={() => addtoCart(productData._id, size)} disabled={!size || loading}>
              {loading ? <Loading /> : "Add to Cart"}
            </button>
            
            <div className='mt-6 border-t border-slate-200 pt-6 text-sm text-slate-500 space-y-2'>
              <p>✓ 100% Original Product</p>
              <p>✓ Cash on delivery is available</p>
              <p>✓ Easy 7-day return and exchange policy</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Description & Reviews Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16'>
        <div className='border-b border-slate-200'>
          <nav className='-mb-px flex gap-6'>
            <button onClick={() => setActiveTab('description')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'description' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Description
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`py-4 px-1 border-b-2 font-medium text-lg ${activeTab === 'reviews' ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
              Reviews (124)
            </button>
          </nav>
        </div>
        <div className='py-8 text-slate-600 prose max-w-none'>
          {activeTab === 'description' && (
            <p>Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart. Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style. Easy to maintain and perfect for any setting, this shirt is a must-have essential for those who value both fashion and function.</p>
          )}
          {activeTab === 'reviews' && (
            <p>Reviews functionality to be added here.</p>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      <div className='bg-slate-50 mt-16 py-16'>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} currentProductId={productData._id} />
      </div>
    </div>
  ) : <div className='w-screen h-screen flex items-center justify-center'><Loading/></div>
}

export default ProductDetail