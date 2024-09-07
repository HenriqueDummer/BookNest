import express from "express"
import { SignUp, LogIn, GetMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.post('/signup', SignUp)
route.post('/login', LogIn)
route.get('/getme', protectRoute, GetMe)

export default route