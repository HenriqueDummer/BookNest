import express from "express"
import { signUp, logIn, getMe, logout, getUserById } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.post('/signup', signUp)
route.post('/login', logIn)
route.post('/logout', logout)
route.get('/getme', protectRoute, getMe)
route.get('/user/:id', protectRoute, getUserById)

export default route