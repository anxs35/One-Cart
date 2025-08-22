import React, { useContext, useState } from 'react'
import Title from '../component/Title'
import CartTotal from '../component/CartTotal'
import razorpay from '../assets/Razorpay.jpg'
import { shopDataContext } from '../context/ShopContext'
import { authDataContext } from '../context/authContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'

function PlaceOrder() {
    let [method,setMethod] = useState('cod')
    let navigate = useNavigate()
    const {cartItem , setCartItem , getCartAmount , delivery_fee , products } = useContext(shopDataContext)
    let {serverUrl} = useContext(authDataContext)
    let [loading ,setLoading] = useState(false)

    let [formData,setFormData] = useState({
        firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    pinCode:'',
    country:'',
    phone:''
    })

    const onChangeHandler = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormData(data => ({...data,[name]:value}))
    }

    const initPay = (order) =>{
        const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
    const {data} = await axios.post(serverUrl + '/api/order/verifyrazorpay',response,{withCredentials:true})
    if(data){
        navigate("/order")
        setCartItem({})
    }
      }}
    const rzp = new window.Razorpay(options)
    rzp.open()
   }

    
     const onSubmitHandler = async (e) => {
        
    setLoading(true)
        e.preventDefault()
    try {
      let orderItems = []
      for(const items in cartItem){
        for(const item in cartItem[items]){
          if(cartItem[items][item] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
               itemInfo.size = item
               itemInfo.quantity = cartItem[items][item]
               orderItems.push(itemInfo)
            }
          }
        }
      }
      let orderData = {
        address:formData,
        items:orderItems,
        amount:getCartAmount() + delivery_fee
      }
      switch(method){
        case 'cod': 
      
        const result = await axios.post(serverUrl + "/api/order/placeorder" , orderData , {withCredentials:true})
        console.log(result.data)
        if(result.data){
            setCartItem({})
            toast.success("Order Placed")
            navigate("/order")
            setLoading(false)
        }else{
            console.log(result.data.message)
            toast.error("Order Placed Error")
             setLoading(false)
        }
        break;

        case 'razorpay':
        const resultRazorpay = await axios.post(serverUrl + "/api/order/razorpay" , orderData , {withCredentials:true})
        if(resultRazorpay.data){
          initPay(resultRazorpay.data)
           toast.success("Order Placed")
           setLoading(false)
        }
        break;

        default:
        break;
      }
    
    } catch (error) {
      console.log(error)
    }
     }
  return (
    <div className='w-full min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8'>
        <form onSubmit={onSubmitHandler} className='max-w-7xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12'>
            {/* Delivery Information */}
            <div className='bg-white p-8 rounded-lg border border-slate-200'>
                <div className='mb-6'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <input type="text" placeholder='First name' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='firstName' value={formData.firstName}/>
                    <input type="text" placeholder='Last name' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='lastName' value={formData.lastName} />
                    <input type="email" placeholder='Email address' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2' required onChange={onChangeHandler} name='email' value={formData.email} />
                    <input type="text" placeholder='Street' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2' required onChange={onChangeHandler} name='street' value={formData.street} />
                    <input type="text" placeholder='City' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='city' value={formData.city} />
                    <input type="text" placeholder='State' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='state' value={formData.state} />
                    <input type="text" placeholder='Pincode' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='pinCode' value={formData.pinCode} />
                    <input type="text" placeholder='Country' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 col-span-1' required onChange={onChangeHandler} name='country' value={formData.country} />
                    <input type="tel" placeholder='Phone' className='w-full h-12 border border-slate-300 rounded-lg bg-transparent px-4 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2' required onChange={onChangeHandler} name='phone' value={formData.phone} />
                </div>
            </div>

            {/* Order Summary & Payment */}
            <div className='space-y-8'>
                <div className='bg-white p-8 rounded-lg border border-slate-200'>
                    <CartTotal/>
                </div>
                <div className='bg-white p-8 rounded-lg border border-slate-200'>
                    <div className='mb-6'>
                        <Title text1={'PAYMENT'} text2={'METHOD'}/>
                    </div>
                    <div className='flex items-center justify-center gap-6'>
                        <button type='button' onClick={()=>setMethod('razorpay')} className={`w-36 h-14 rounded-lg overflow-hidden transition-all ${method === 'razorpay' ? 'ring-2 ring-blue-600 ring-offset-2' : 'opacity-70 hover:opacity-100'}`}> 
                            <img src={razorpay} className='w-full h-full object-cover' alt="Razorpay" />
                        </button>
                        <button type='button' onClick={()=>setMethod('cod')} className={`w-48 h-14 bg-white border border-slate-300 rounded-lg text-slate-700 font-semibold transition-all ${method === 'cod' ? 'ring-2 ring-blue-600 ring-offset-2' : 'hover:border-slate-400'}`}>
                            CASH ON DELIVERY
                        </button>
                    </div>
                </div>
                <div>
                    <button type='submit' className='w-full h-14 text-lg font-semibold bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex items-center justify-center' disabled={loading}>
                        {loading ? <Loading/> : "PLACE ORDER"}
                    </button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default PlaceOrder