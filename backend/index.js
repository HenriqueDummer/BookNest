import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectToMongoDB from "./db/connectToMongoDB.js"
import cookieParser from "cookie-parser"

import authRoute from "./routes/auth.routes.js"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRoute)

app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
    connectToMongoDB()
})