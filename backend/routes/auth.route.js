import express from "express"
import { signUp, logIn, getMe } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.post('/signup', signUp)
route.post('/login', logIn)
route.get('/getme', protectRoute, getMe)

export default route