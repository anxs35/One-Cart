import React, { useContext, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import upload from '../assets/upload image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function Add() {
  let [image1,setImage1] = useState(false)
  let [image2,setImage2] = useState(false)
  let [image3,setImage3] = useState(false)
  let [image4,setImage4] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("Men")
  const [price, setPrice] = useState("")
  const [subCategory, setSubCategory] = useState("TopWear")
  const [bestseller, setBestSeller] = useState(false)
  const [sizes,setSizes] = useState([])
  const [loading,setLoading] = useState(false)
  let {serverUrl} = useContext(authDataContext)

  const handleAddProduct = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append("name",name)
      // ... (rest of your logic is unchanged)

      let result = await axios.post(serverUrl + "/api/product/addproduct", formData, {withCredentials:true})
      toast.success("Product Added Successfully")
      setLoading(false)

      if(result.data){
          setName("")
          setDescription("")
          // ... (rest of your logic is unchanged)
      }
    } catch (error) {
       console.log(error)
       setLoading(false)
       toast.error("Failed to Add Product")
    }
  }

  const imageUploadClasses = 'w-24 h-24 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 cursor-pointer hover:border-blue-500 bg-slate-50';
  const inputClasses = 'w-full h-11 border border-slate-300 rounded-lg px-4 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const selectClasses = 'w-full h-11 border border-slate-300 rounded-lg px-4 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500';
  const labelClasses = 'text-base font-medium text-slate-700';

  return (
    <div className='w-full min-h-screen bg-slate-100'>
      <Nav/>
      <Sidebar/>
      <main className='pl-64 pt-20'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold text-slate-800 mb-8'>Add New Product</h1>
          <form onSubmit={handleAddProduct} className='max-w-4xl bg-white p-8 rounded-lg shadow-md border border-slate-200 space-y-8'>
            <div>
              <label className={labelClasses}>Upload Images</label>
              <div className='flex items-center gap-4 mt-2'>
                {[image1, image2, image3, image4].map((img, index) => (
                  <label key={index} htmlFor={`image${index+1}`} className={imageUploadClasses}>
                    <img src={!img ? upload : URL.createObjectURL(img)} alt={`Upload ${index+1}`} className='w-full h-full object-cover rounded-lg' />
                    <input type="file" id={`image${index+1}`} hidden onChange={(e) => [setImage1, setImage2, setImage3, setImage4][index](e.target.files[0])} required />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClasses}>Product Name</label>
              <input type="text" placeholder='e.g., Classic Cotton T-Shirt' className={`${inputClasses} mt-2`} onChange={(e)=>setName(e.target.value)} value={name} required/>
            </div>

            <div>
              <label className={labelClasses}>Product Description</label>
              <textarea placeholder='Describe the product...' className={`${inputClasses} mt-2 h-28 py-2`} onChange={(e)=>setDescription(e.target.value)} value={description} required />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
              <div>
                <label className={labelClasses}>Product Category</label>
                <select className={`${selectClasses} mt-2`} onChange={(e)=>setCategory(e.target.value)}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div>
                <label className={labelClasses}>Sub-Category</label>
                <select className={`${selectClasses} mt-2`} onChange={(e)=>setSubCategory(e.target.value)}>
                  <option value="TopWear">TopWear</option>
                  <option value="BottomWear">BottomWear</option>
                  <option value="WinterWear">WinterWear</option>
                </select>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Product Price (₹)</label>
              <input type="number" placeholder='e.g., 999' className={`${inputClasses} mt-2`} onChange={(e)=>setPrice(e.target.value)} value={price} required/>
            </div>

            <div>
              <label className={labelClasses}>Available Sizes</label>
              <div className='flex items-center gap-3 mt-2 flex-wrap'>
                {["S", "M", "L", "XL", "XXL"].map(size => (
                  <div key={size} className={`px-4 py-2 rounded-lg border cursor-pointer font-medium ${sizes.includes(size) ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"}`} onClick={()=>setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev , size])}>{size}</div>
                ))}
              </div>
            </div>

            <div className='flex items-center gap-3 pt-4'>
              <input type="checkbox" id='checkbox' className='w-5 h-5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer' onChange={()=>setBestSeller(prev => !prev)}/>
              <label htmlFor="checkbox" className={labelClasses}>Add to Best Seller</label>
            </div>
            
            <button type='submit' className='w-full md:w-auto h-12 px-10 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center' disabled={loading}>
              {loading ? <Loading/> : "Add Product"}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Add