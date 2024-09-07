import express from "express"

import { getAllBooks, addBook, getBooksByStatus, updateBook } from "../controllers/books.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.get('/all', protectRoute, getAllBooks)
route.post('/create', protectRoute, addBook)
route.post('/update/:id', protectRoute, updateBook)
route.get('/:status', protectRoute, getBooksByStatus)

export default route