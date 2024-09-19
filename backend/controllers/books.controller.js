import Book from "../models/book.model.js";
import { v2 as cloudinary } from "cloudinary";

export const getAllBooks = async (req, res) => {
  try {
    const user = req.user;

    const books = await Book.find({ userId: user._id });
    if (books) {
      return res.status(200).json(books);
    } else {
      return res.status(400).json({ error: "Could not find books" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      status,
      currentPage,
      totalPages,
      summary,
      genres,
      pubYear,
    } = req.body;
    let { bookCover } = req.body;
    const userId = req.user._id;

    console.log(req.body)
    if (!title || !bookCover || !author || !totalPages || !summary)
      return res
        .status(400)
        .json({error: "Must provide title, author, cover, summary and total pages!"});

    const existingBook = await Book.find({title}) 

    if(existingBook.length !== 0)
      return res
        .status(400)
        .json({error: "A book with this title already exist!"});

    if (bookCover) {
      const uploadedResponse = await cloudinary.uploader.upload(bookCover);
      bookCover = uploadedResponse.secure_url;
    }


    const newBook = new Book({
      userId,
      title,
      author,
      totalPages,
      currentPage,
      summary,
      genres,
      pubYear,
      bookCover,
      status,
    });

    if (newBook) {
      newBook.save();
      return res.status(201).json(newBook);
    } else {
      return res.status(400).json({ error: "Could not creat book" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      status,
      totalPages,
      summary,
      genres,
      pubYear,
      currentPage,
    } = req.body;
    let { bookCover } = req.body;
    const { id } = req.params;    

    let book = await Book.findById(id);

    if(bookCover){
        if(book.bookCover && book.bookCover !== bookCover){
          await cloudinary.uploader.destroy(book.bookCover.split("/").pop().split(".")[0]);
        }
        
        if(book.bookCover !== bookCover){
          const uploadedResponse = await cloudinary.uploader.upload(bookCover)
          bookCover = uploadedResponse.secure_url
        }
    }

    (book.title = title || book.title),
      (book.author = author || book.author),
      (book.totalPages = totalPages || book.totalPages),
      (book.currentPage = currentPage || book.currentPage),
      (book.summary = summary || book.summary),
      (book.genres = genres || book.genres),
      (book.pubYear = pubYear || book.pubYear),
      (book.bookCover = bookCover || book.bookCover),
      (book.status = status || book.status);
    book.currentPage = currentPage || book.currentPage;

    book = await book.save()

    return res.status(200).json(book)
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksByStatus = async (req, res) => {
  const { status } = req.params;
  const user = req.user;

  try {
    const booksByStatus = await Book.find({
      $and: [{ userId: user._id }, { status: status }],
    });

    return res.status(200).json(booksByStatus);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  console.log("status")

  try {
    const book = await Book.findById(id); // Certifique-se de que está buscando corretamente no banco de dados

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    
    return res.status(200).json(book); // Retorna o livro encontrado
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
}