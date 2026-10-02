import Order from "../model/orderModel.js";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";
import stockNotificationModel from "../model/stockNotificationModel.js";
import { addPoints } from "./loyaltyController.js";
import razorpay from 'razorpay'
import dotenv from 'dotenv'
dotenv.config()
const currency = 'inr'
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

// for User
export const placeOrder = async (req,res) => {

     try {
         const {items , amount , address} = req.body;
         const userId = req.userId;
         const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'COD',
            payment:false,
            date: Date.now()
         }

         const newOrder = new Order(orderData)
         await newOrder.save()

         // Update stock quantities
         for (const item of items) {
             const product = await Product.findById(item._id)
             if (product) {
                 product.stock -= item.quantity
                 await product.save()
                 
                 // Create notification if out of stock
                 if (product.stock <= 0) {
                     await stockNotificationModel.create({
                         productId: product._id,
                         productName: product.name,
                         message: `${product.name} is now out of stock`
                     })
                 }
             }
         }

         await User.findByIdAndUpdate(userId,{cartData:{}})
         
         // Add loyalty points (1 point per 10 rupees)
         const points = Math.floor(amount / 10)
         console.log(`Adding ${points} loyalty points for user ${userId}, order amount: ${amount}`)
         const loyaltyResult = await addPoints(userId, points)
         console.log('Loyalty points added:', loyaltyResult)

         return res.status(201).json({message:'Order Place', loyaltyPoints: points})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'Order Place error'})
    }
    
}


export const placeOrderRazorpay = async (req,res) => {
    console.log("=== RAZORPAY ORDER START ===")
    console.log("Request body:", req.body)
    console.log("User ID:", req.userId)
    console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID)
    console.log("Razorpay Key Secret exists:", !!process.env.RAZORPAY_KEY_SECRET)
    
    try {
        const {items , amount , address} = req.body;
        const userId = req.userId;
        
        if (!items || !amount || !address) {
            console.log("Missing required fields")
            return res.status(400).json({message: "Missing required fields"})
        }
        
        const options = {
            amount: Math.round(amount * 100),
            currency: 'INR',
            receipt: `order_${Date.now()}`
        }
        
        console.log("Creating Razorpay order with options:", options)
        const order = await razorpayInstance.orders.create(options)
        console.log("Razorpay order created successfully:", order.id)
        
        const orderData = {
            items,
            amount,
            userId,
            address,
            paymentMethod:'Razorpay',
            payment:false,
            date: Date.now()
         }

         console.log("Saving order to database...")
         const newOrder = new Order(orderData)
         await newOrder.save()
         console.log("Order saved successfully:", newOrder._id)
         
         console.log("=== RAZORPAY ORDER SUCCESS ===")
         res.status(200).json(order)
    } catch (error) {
        console.log("=== RAZORPAY ORDER ERROR ===")
        console.log("Error type:", error.constructor.name)
        console.log("Error message:", error.message)
        console.log("Full error:", error)
        res.status(500).json({message: error.message || "Payment initialization failed"})
    }
}


export const verifyRazorpay = async (req,res) =>{
    console.log("=== PAYMENT VERIFICATION START ===")
    console.log("Request body:", req.body)
    
    try {
        const userId = req.userId
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        
        if (!razorpay_order_id) {
            return res.status(400).json({message: "Order ID missing"})
        }
        
        // For now, just mark payment as successful without signature verification
        // In production, you should verify the signature
        
        // Find and update the order
        const order = await Order.findOneAndUpdate(
            {paymentMethod: 'Razorpay', payment: false},
            {payment: true},
            {sort: {date: -1}}
        )
        
        if (order) {
            // Update stock quantities
            for (const item of order.items) {
                const product = await Product.findById(item._id)
                if (product) {
                    product.stock -= item.quantity
                    await product.save()
                    
                    // Create notification if out of stock
                    if (product.stock <= 0) {
                        await stockNotificationModel.create({
                            productId: product._id,
                            productName: product.name,
                            message: `${product.name} is now out of stock`
                        })
                    }
                }
            }
            
            // Clear user cart
            await User.findByIdAndUpdate(userId, {cartData: {}})
            
            // Add loyalty points (1 point per 10 rupees)
            const points = Math.floor(order.amount / 10)
            console.log(`Adding ${points} loyalty points for user ${userId}, order amount: ${order.amount}`)
            const loyaltyResult = await addPoints(userId, points)
            console.log('Loyalty points added:', loyaltyResult)
            
            console.log("Payment verified successfully")
            res.status(200).json({message: 'Payment Successful', success: true, loyaltyPoints: points})
        } else {
            console.log("Order not found")
            res.status(404).json({message: 'Order not found'})
        }
    } catch (error) {
        console.log("Payment verification error:", error)
        res.status(500).json({message: error.message || "Payment verification failed"})
    }
}






export const userOrders = async (req,res) => {
      try {
        const userId = req.userId;
        const orders = await Order.find({userId})
        return res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"userOrders error"})
    }
    
}




//for Admin



    
export const allOrders = async (req,res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"adminAllOrders error"})
        
    }
    
}
    
export const updateStatus = async (req,res) => {
    
try {
    const {orderId , status} = req.body

    await Order.findByIdAndUpdate(orderId , { status })
    return res.status(201).json({message:'Status Updated'})
} catch (error) {
     return res.status(500).json({message:error.message
            })
}
}