import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getAdmin, getCurrentUser, getAllUsers, deleteUser } from "../controller/userController.js"
import adminAuth from "../middleware/adminAuth.js"

let userRoutes = express.Router()

userRoutes.get("/getcurrentuser", getCurrentUser)
userRoutes.get("/getadmin", adminAuth, getAdmin)
userRoutes.get("/all", adminAuth, getAllUsers)
userRoutes.delete("/remove/:id", adminAuth, deleteUser)

export default userRoutes