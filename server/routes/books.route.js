import express from "express"

import { addBook, updateBook, getBookById, deleteBook, shareBook, getPublicBooks, getMyBooks, copyBook } from "../controllers/books.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.get('/me', protectRoute, getMyBooks)
route.get('/public', protectRoute, getPublicBooks)
route.get('/book/:id',protectRoute, getBookById)
route.post('/create', protectRoute, addBook)
route.delete('/delete/:id',protectRoute, deleteBook)
route.patch('/update/:id', protectRoute, updateBook)
route.post('/share/:id', protectRoute, shareBook)
route.post('/copy/:id', protectRoute, copyBook)

export default route