import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies.token
        console.log("Token:", token)
        if(!token) return res.status(400).json({error: "No token provided"})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({error: "Token invalid"})

        const user = await User.findById(decoded.userId).select("-password")
        if(!user) return res.status(400).json({error: "User not found"})
        
        req.user = user
        next()
    } catch(err){
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
}