import express from "express"

import { getAllBooks, addBook, getBooksByStatus, updateBook, getBookById, deleteBook, shareBook, getPublicBooks } from "../controllers/books.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.get('/all', protectRoute, getAllBooks)
route.get('/public', protectRoute, getPublicBooks)
route.get('/:id',protectRoute, getBookById)
route.post('/create', protectRoute, addBook)
route.delete('/delete/:id',protectRoute, deleteBook)
route.patch('/update/:id', protectRoute, updateBook)
route.get('/status/:status', protectRoute, getBooksByStatus)
route.post('/share/:id', protectRoute, shareBook)

export default route