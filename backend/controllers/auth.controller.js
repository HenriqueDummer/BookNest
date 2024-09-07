import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

function generateTokenAndSaveCookie(userId, res) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15d",
    });

    res.cookie("token", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: false,
        sameSite: "None"
    });
}

export const SignUp = async (req, res) => {
    const { email, password, username, fullname } = req.body

    try {
        if (!email || !password || !username || !fullname) {
            return res.status(400).json({ error: "All parameter are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) return res.status(400).json({ error: "Email format is invalid" })

        const userExists = await User.findOne({ username })
        if (userExists) return res.status(400).json({ error: "Username is already taken" })

        const emailExists = await User.findOne({ email })
        if (emailExists) return res.status(400).json({ error: "Email is already registered" })

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            username,
            fullname,
            email,
            password: hashedPassword
        })

        if (newUser) {
            generateTokenAndSaveCookie(newUser._id, res)

            await newUser.save()
            return res.status(201).json(`Signed up as ${newUser.fullname}`)
        } else {
            return res.status(400).json({ error: "Cold not create user" })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }

}

export const LogIn = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ error: "All parameter are required" })
        }

        const user = await User.findOne({ email })
        const isPaswordCorrect = await bcrypt.compare(password, user?.password || "")
       
        if (!user || !isPaswordCorrect) return res.status(400).json({ error: "Email or password incorrect" })
        
        generateTokenAndSaveCookie(user._id, res)
        res.status(200).json(`Logged in as ${user.fullname}`)

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }

}   

export const GetMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        return res.status(200).json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" })
    }

}   