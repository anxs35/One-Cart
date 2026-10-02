import React, { useContext, useState } from 'react'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  let [image1, setImage1] = useState(false)
  let [image2, setImage2] = useState(false)
  let [image3, setImage3] = useState(false)
  let [image4, setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([])
  const [stock, setStock] = useState("")
  const [loading, setLoading] = useState(false)
  let { serverUrl } = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name", name)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("category", category)
      formData.append("subCategory", subCategory)
      formData.append("bestseller", bestseller)
      formData.append("sizes", JSON.stringify(sizes))
      formData.append("stock", stock)
      formData.append("image1", image1)
      formData.append("image2", image2)
      formData.append("image3", image3)
      formData.append("image4", image4)

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, { withCredentials: true })

      console.log(result.data)
      toast.success("Product Added Successfully")
      setLoading(false)

      if (result.data) {
        setName("")
        setDescription("")
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice("")
        setBestSeller(false)
        setCategory("Men")
        setSubCategory("TopWear")
        setStock("")
        setSizes([])
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("Add Product Failed")
    }
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-slate-800'>Add New Product</h1>
      </div>

      <form onSubmit={handleAddProduct} className='bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8'>

        {/* Image Upload Section */}
        <div className='mb-8'>
          <p className='text-lg font-semibold text-slate-700 mb-4'>Upload Images</p>
          <div className='flex gap-4 flex-wrap'>
            {[image1, image2, image3, image4].map((img, index) => (
              <label key={index} htmlFor={`image${index + 1}`} className='group relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500 cursor-pointer bg-slate-50 flex items-center justify-center overflow-hidden transition-colors'>
                <img src={!img ? upload : URL.createObjectURL(img)} alt={`Upload ${index + 1}`} className={`w-full h-full object-cover transition-transform ${!img ? 'p-4 opacity-50 group-hover:scale-110' : ''}`} />
                <input type="file" id={`image${index + 1}`} hidden onChange={(e) => {
                  const file = e.target.files[0];
                  if (index === 0) setImage1(file);
                  if (index === 1) setImage2(file);
                  if (index === 2) setImage3(file);
                  if (index === 3) setImage4(file);
                }} />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
          <div className='col-span-1 md:col-span-2'>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Product Name</label>
            <input type="text" placeholder='e.g. Cotton T-Shirt' className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all' onChange={(e) => setName(e.target.value)} value={name} required />
          </div>

          <div className='col-span-1 md:col-span-2'>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Description</label>
            <textarea placeholder='Describe the product...' rows="4" className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all resize-none' onChange={(e) => setDescription(e.target.value)} value={description} required />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Category</label>
            <div className="relative">
              <select className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none appearance-none bg-white transition-all' onChange={(e) => setCategory(e.target.value)} value={category}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Sub-Category</label>
            <div className="relative">
              <select className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none appearance-none bg-white transition-all' onChange={(e) => setSubCategory(e.target.value)} value={subCategory}>
                <option value="TopWear">TopWear</option>
                <option value="BottomWear">BottomWear</option>
                <option value="WinterWear">WinterWear</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Price</label>
            <input type="number" placeholder='0' className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all' onChange={(e) => setPrice(e.target.value)} value={price} required />
          </div>

          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>Stock</label>
            <input type="number" placeholder='0' className='w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all' onChange={(e) => setStock(e.target.value)} value={stock} required />
          </div>
        </div>

        {/* Sizes */}
        <div className='mb-8'>
          <p className='text-sm font-medium text-slate-700 mb-3'>Available Sizes</p>
          <div className='flex gap-3 flex-wrap'>
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div key={size}
                className={`px-4 py-2 rounded-lg cursor-pointer border transition-all duration-200 text-sm font-medium select-none
                ${sizes.includes(size)
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-300"}`}
                onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}
              >
                {size}
              </div>
            ))}
          </div>
        </div>

        {/* Bestseller Checkbox */}
        <div className='flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-lg'>
          <input type="checkbox" id='bestseller' className='w-5 h-5 cursor-pointer accent-blue-600 rounded bg-gray-100 border-gray-300 focus:ring-blue-500' onChange={() => setBestSeller(prev => !prev)} checked={bestseller} />
          <label htmlFor="bestseller" className='text-sm font-medium text-slate-700 cursor-pointer'>
            Mark as Bestseller Product
          </label>
        </div>

        <button className='w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-sm active:scale-95 flex items-center justify-center'>
          {loading ? <Loading /> : "Add Product"}
        </button>

      </form>
    </div>
  )
}

export default Add


