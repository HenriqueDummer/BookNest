import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
const MONGO_URI = process.env.MONGO_URI


async function connectToMongoDB() {
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Successfully connected to MongoDB")
    } catch(err){
        console.error(err)
        process.exit(1)
    }
}

export default connectToMongoDB