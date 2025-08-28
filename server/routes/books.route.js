import express from "express"

import { addBook, updateBook, getBookById, deleteBook, shareBook, getPublicBooks, getMyBooks, copyBook, updateProgress, addNote, deleteNote } from "../controllers/books.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

const route = express.Router()

route.get('/me', protectRoute, getMyBooks)
route.get('/public', protectRoute, getPublicBooks)
route.get('/book/:id',protectRoute, getBookById)

route.post('/create', protectRoute, addBook)
route.post('/share/:id', protectRoute, shareBook)
route.post('/copy/:id', protectRoute, copyBook)

route.patch('/update/progress/:id', protectRoute, updateProgress)
route.patch('/update/add_note/:id', protectRoute, addNote)
route.patch('/update/delete_note/:id', protectRoute, deleteNote)
route.patch('/update/:id', protectRoute, updateBook)

route.delete('/delete/:id',protectRoute, deleteBook)


export default route