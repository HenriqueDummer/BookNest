import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js"
import cookieParser from "cookie-parser"
import {v2 as cloudinary} from "cloudinary"

import authRoute from "./routes/auth.route.js"
import booksRoute from "./routes/books.route.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET,
 })

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: "5mb"}))

app.use('/api/auth', authRoute)
app.use('/api/books', booksRoute)

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
    connectToMongoDB()
})