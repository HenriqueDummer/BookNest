import express from "express"
import { SignUp, LogIn } from "../controllers/auth.controller.js"

const route = express.Router()

route.post('/signup', SignUp)
route.post('/login', LogIn)

export default route