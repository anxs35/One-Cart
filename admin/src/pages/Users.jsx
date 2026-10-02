import React, { useContext, useEffect, useState } from 'react'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { toast } from 'react-toastify'

function Users() {
  let [users, setUsers] = useState([])
  let { serverUrl } = useContext(authDataContext)

  const fetchUsers = async () => {
    try {
      let result = await axios.get(serverUrl + "/api/user/all", { withCredentials: true })
      setUsers(result.data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch users")
    }
  }

  const removeUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      try {
        let result = await axios.delete(`${serverUrl}/api/user/remove/${id}`, { withCredentials: true })
        if (result.data.success) {
          toast.success("User removed successfully")
          fetchUsers()
        } else {
          toast.error("Failed to remove user")
        }
      } catch (error) {
        console.log(error)
        toast.error("Failed to remove user")
      }
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='flex items-center justify-between mb-8'>
        <h1 className='text-3xl font-bold text-slate-800'>Manage Users</h1>
        <div className="text-sm font-medium text-slate-500">Total Users: {users.length}</div>
      </div>

      <div className='bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden'>
        <div className="overflow-x-auto">
          <table className='w-full text-sm text-left text-slate-600'>
            <thead className='bg-slate-50 text-xs text-slate-700 uppercase'>
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Name</th>
                <th scope="col" className="px-6 py-4 font-semibold">Email</th>
                <th scope="col" className="px-6 py-4 font-semibold">Joined Date</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user, index) => (
                <tr key={index} className='bg-white hover:bg-slate-50 transition-colors'>
                  <td className='px-6 py-4 font-medium text-slate-900'>{user.name}</td>
                  <td className='px-6 py-4'>{user.email}</td>
                  <td className='px-6 py-4'>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className='px-6 py-4 text-center'>
                    <button onClick={() => removeUser(user._id)} className='p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all' title="Remove User">
                      <RiDeleteBin6Line className='w-5 h-5' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className='text-center py-20'>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-slate-500 text-lg font-medium">No users found</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
