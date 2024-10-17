import express from "express"
import { signUp, logIn, getMe, logout } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.post('/signup', signUp)
route.post('/login', logIn)
route.post('/logout', logout)
route.get('/login', (req, res) => {
    res.send({message: "Get login"})
})
route.get('/getme', protectRoute, getMe)

export default route