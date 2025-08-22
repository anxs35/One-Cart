import React, { useContext, useEffect, useState } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'

function Lists() {
  let [list ,setList] = useState([])
  let {serverUrl} = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{withCredentials:true})
      if(result.data){
        fetchList()
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
   fetchList()
  },[])

  return (
    <div className='w-full min-h-screen bg-slate-100'>
      <Nav/>
      <Sidebar/>
      <main className='pl-64 pt-20'>
        <div className='p-8'>
          <h1 className='text-3xl font-bold text-slate-800 mb-8'>Product List</h1>
          <div className='bg-white rounded-lg shadow-sm border border-slate-200 overflow-x-auto'>
            <table className='w-full text-sm text-left text-slate-600'>
              <thead className='bg-slate-50 text-xs text-slate-700 uppercase'>
                <tr>
                  <th scope="col" className="px-6 py-3">Image</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Category</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} className='bg-white border-b border-slate-200 hover:bg-slate-50'>
                    <td className='px-6 py-4'>
                      <img src={item.image1} className='w-14 h-14 rounded-md object-cover' alt={item.name} />
                    </td>
                    <td className='px-6 py-4 font-medium text-slate-900'>{item.name}</td>
                    <td className='px-6 py-4'>{item.category}</td>
                    <td className='px-6 py-4'>₹{item.price}</td>
                    <td className='px-6 py-4'>
                      <button onClick={() => removeList(item._id)} className='text-red-500 hover:text-red-700'>
                        <RiDeleteBin6Line className='w-5 h-5'/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {list.length === 0 && (
              <div className='text-center text-slate-500 py-20'>No products found.</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Lists