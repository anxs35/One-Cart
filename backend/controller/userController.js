import User from "../model/userModel.js"

import jwt from 'jsonwebtoken';

export const getCurrentUser = async (req, res) => {
    try {
        let { token } = req.cookies;
        if (!token) {
            return res.status(200).json(null);
        }

        let verifyToken;
        try {
            verifyToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // Token is invalid or expired
            return res.status(200).json(null);
        }

        let user = await User.findById(verifyToken.userId).select("-password")
        if (!user) {
            return res.status(200).json(null);
        }
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `getCurrentUser error ${error}` })
    }
}
export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(404).json({ message: "Admin is not found" })
        }
        return res.status(201).json({
            email: adminEmail,
            role: "admin"
        })
} catch (error) {
        console.log(error)
        return res.status(500).json({ message: `getAdmin error ${error}` })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching users", success: false });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully", success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting user", success: false });
    }
}