import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'

function Lists() {
  let [list, setList] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchList = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/product/list")
      setList(result.data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch products")
    }
  }

  const removeList = async (id) => {
    try {
      let result = await axios.post(`${serverUrl}/api/product/remove/${id}`, {}, { withCredentials: true })
      if (result.data) {
        toast.success("Product removed")
        fetchList()
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to remove product")
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-slate-800'>Product List</h1>
        <div className="text-sm font-medium text-slate-500">Total Products: {list.length}</div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left text-slate-600'>
            <thead className='bg-slate-50 text-xs text-slate-700 uppercase'>
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Image</th>
                <th scope="col" className="px-6 py-4 font-semibold">Name</th>
                <th scope="col" className="px-6 py-4 font-semibold">Category</th>
                <th scope="col" className="px-6 py-4 font-semibold">Price</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((item, index) => (
                <tr key={index} className='bg-white hover:bg-slate-50 transition-colors'>
                  <td className='px-6 py-4'>
                    <img src={item.image1} className='w-12 h-12 rounded-lg object-cover border border-slate-200 shadow-sm' alt={item.name} />
                  </td>
                  <td className='px-6 py-4 font-medium text-slate-900'>{item.name}</td>
                  <td className='px-6 py-4'>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {item.category}
                    </span>
                  </td>
                  <td className='px-6 py-4 font-semibold'>₹{item.price}</td>
                  <td className='px-6 py-4 text-center'>
                    <button onClick={() => removeList(item._id)} className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all' title="Remove Product">
                      <RiDeleteBin6Line className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {list.length === 0 && (
          <div className='text-center py-20'>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="text-3xl">📦</span>
            </div>
            <p className="text-slate-500 text-lg font-medium">No products found</p>
            <p className="text-slate-400 text-sm mt-1">Add some products to get started.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lists