import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
dotenv.config()
import cors from "cors"
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import loyaltyRoutes from './routes/loyaltyRoutes.js'
import alertRoutes from './routes/alertRoutes.js'
import stockNotificationRoutes from './routes/stockNotificationRoutes.js'
import migrationRoutes from './routes/migrationRoutes.js'
import aiRoutes from './routes/aiRoute.js'

let port = process.env.PORT || 5000

let app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174", "http://192.168.29.178:5173"],
    credentials: true
}))

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)
app.use("/api/product", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/wishlist", wishlistRoutes)
app.use("/api/loyalty", loyaltyRoutes)
app.use("/api/alert", alertRoutes)
app.use("/api/stock-notifications", stockNotificationRoutes)
app.use("/api/migration", migrationRoutes)
app.use("/api/ai", aiRoutes)




app.listen(port, () => {
    console.log("Hello From Server")
    connectDb()
})


