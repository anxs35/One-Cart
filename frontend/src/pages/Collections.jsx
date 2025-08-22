import React, { useContext, useEffect, useState } from 'react'
import { FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import Title from '../component/Title';
import { shopDataContext } from '../context/ShopContext';
import Card from '../component/Card';

function Collections() {

    let [showFilter,setShowFilter] = useState(false)
    let {products,search,showSearch} = useContext(shopDataContext)
    let [filterProduct,setFilterProduct] = useState([])
    let [category,setCaterory] = useState([])
    let [subCategory,setSubCaterory] = useState([])
    let [sortType,SetSortType] = useState("relavent")

    const toggleCategory = (e) =>{
        if(category.includes(e.target.value)){
            setCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setCaterory(prev => [...prev,e.target.value])
         }
    }

    const toggleSubCategory = (e) =>{
         if(subCategory.includes(e.target.value)){
            setSubCaterory(prev => prev.filter(item => item !== e.target.value))
        }else
         {
            setSubCaterory(prev => [...prev,e.target.value])
         }
    }

    const applyFilter = ()=>{
        let productCopy = products.slice()

        if(showSearch && search){
            productCopy = productCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }
        if(category.length > 0)
        {
            productCopy = productCopy.filter(item => category.includes(item.category))
        }
        if(subCategory.length > 0)
        {
            productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
        }
        setFilterProduct(productCopy)

    }


    const sortProducts = (e)=>{
        let fbCopy = filterProduct.slice()

        switch(sortType){
         case 'low-high':
            setFilterProduct(fbCopy.sort((a,b)=>(a.price - b.price)))
        break;

         case 'high-low':
            setFilterProduct(fbCopy.sort((a,b)=>(b.price - a.price)))
        break;
        default:
            applyFilter()
        break;
        }

    }

    useEffect(()=>{
        sortProducts()
    },[sortType])


    useEffect(()=>{
    setFilterProduct(products)
    },[products])

    useEffect(()=>{
        applyFilter()
    },[category,subCategory,search ,showSearch])

  return (
    <div className='w-full min-h-screen bg-slate-50 flex pt-20'>
      {/* Sidebar */}
      <aside className={`md:w-[30vw] lg:w-[20vw] w-full md:block bg-white p-6 border-r border-slate-200 lg:fixed lg:h-full`}>
        <div className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold text-slate-800 cursor-pointer' onClick={()=>setShowFilter(prev=>!prev)}>
                FILTERS
            </h2>
            <button className='md:hidden' onClick={()=>setShowFilter(prev=>!prev)}>
                {!showFilter ? <FaChevronRight className='text-lg' /> : <FaChevronDown className='text-lg' />}
            </button>
        </div>
        
        <div className={`mt-6 space-y-6 ${showFilter ? "block" : "hidden"} md:block`}>
            {/* Categories Filter */}
            <div className='border border-slate-200 p-4 rounded-lg'>
                <p className='text-lg font-semibold text-slate-700 mb-3'>CATEGORIES</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='Men' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleCategory} /> Men
                    </label>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='Women' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleCategory} /> Women
                    </label>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='Kids' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleCategory} /> Kids
                    </label>
                </div>
            </div>
            
            {/* Sub-Categories Filter */}
            <div className='border border-slate-200 p-4 rounded-lg'>
                <p className='text-lg font-semibold text-slate-700 mb-3'>SUB-CATEGORIES</p>
                <div className='space-y-2'>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='TopWear' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleSubCategory} /> TopWear
                    </label>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='BottomWear' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleSubCategory} /> BottomWear
                    </label>
                    <label className='flex items-center gap-3 text-base text-slate-600'>
                        <input type="checkbox" value='WinterWear' className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500' onChange={toggleSubCategory} /> WinterWear
                    </label>
                </div>
            </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className='w-full lg:pl-[20vw] p-6 md:p-8'>
        <div className='flex justify-between items-center flex-col md:flex-row gap-6 mb-8'>
            <Title text1={"ALL"} text2={"COLLECTIONS"}/>
            <select name="sort" id="sort" className='bg-white w-full md:w-52 h-12 px-4 border border-slate-300 rounded-lg text-slate-700 focus:ring-blue-500 focus:border-blue-500' onChange={(e)=>SetSortType(e.target.value)}>
                <option value="relavent">Sort By: Relevant</option>
                <option value="low-high">Sort By: Price Low to High</option>
                <option value="high-low">Sort By: Price High to Low</option>
            </select>
        </div>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {filterProduct.map((item,index) => (
                <Card key={index} id={item._id} name={item.name} price={item.price} image={item.image1}/>
            ))}
        </div>
      </main>
    </div>
  )
}

export default Collections