import Book from "../models/book.model.js"
import { v2 as cloudinary } from "cloudinary"

export const getAllBooks = async (req, res) => {
    try{
        const user = req.user

        const books = await Book.find({userId: user._id})
        if(books){
            return res.status(200).json(books)
        }else {
            return res.status(400).json({error: "Could not find books"})
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
}

export const addBook = async (req, res) => {
    try{
        const {title, author, status, pages, description, genres, publicationYear} = req.body
        let {bookCover } = req.body
        const userId = req.user._id

        if(!title || !author || !pages || !description) return res.status(400).json({error: "Must provide title, pages, description and author"})

        if(bookCover){
            const uploadedResponse = await cloudinary.uploader.upload(bookCover)
            img = uploadedResponse.secure_url
        }

        const newBook = new Book({
            userId,
            title,
            author,
            pages,
            description,
            genres,
            publicationYear,
            bookCover,
            status
        })

        if(newBook){
            newBook.save()
            return res.status(201).json(newBook)
        } else {
            return res.status(400).json({error: "Could not creat book"})
        }
       
    }catch(err){
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
}

export const getBooksByStatus = async (req, res) => {
    const {status} = req.params
    const user = req.user

    try {
        const booksByStatus = await Book.find({$and: [{userId: user._id}, {status: status}]})

        return res.status(200).json(booksByStatus)
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: "Internal server error"})
    }
}