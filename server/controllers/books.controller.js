import PrivateBook from "../models/private_book.model.js";
import { v2 as cloudinary } from "cloudinary";
import PublicBook from "../models/public_book.model.js";

export const getAllBooks = async (req, res) => {
  try {
    const user = req.user;

    const books = await PrivateBook.find({ userId: user._id });
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

export const getPublicBooks = async (req, res) => {
  try {
    const books = await PublicBook.find();

    if (books) {
      return res.status(200).json(books);
    } else {
      return res.status(400).json({ error: "Could not find public books" });
    }

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

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
    let { bookCover, bookBackground } = req.body;
    const userId = req.user._id;

    console.log(summary);
    if (!title || !bookCover || !author || !totalPages || !summary)
      return res
        .status(400)
        .json({
          error: "Must provide title, author, cover, summary and total pages!",
        });

    const existingBook = await PrivateBook.find({ title });

    if (existingBook.length !== 0)
      return res
        .status(400)
        .json({ error: "A book with this title already exist!" });

    if (bookCover) {
      const uploadedResponse = await cloudinary.uploader.upload(bookCover);
      bookCover = uploadedResponse.secure_url;
    }

    if (bookBackground) {
      const uploadedResponse = await cloudinary.uploader.upload(bookBackground);
      bookBackground = uploadedResponse.secure_url;
    }

    const newBook = new PrivateBook({
      userId,
      title,
      author,
      totalPages,
      currentPage,
      summary,
      genres,
      pubYear,
      bookCover,
      bookBackground,
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

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const book = await PrivateBook.findById(id)
    if (!book) {
      return res.status(400).json({ error: "Book not found!" })
    }

    await cloudinary.uploader.destroy(
      book.bookCover.split("/").pop().split(".")[0]
    );

    await cloudinary.uploader.destroy(
      book.bookBackground.split("/").pop().split(".")[0]
    );

    await PrivateBook.findByIdAndDelete(id)

    res.status(200).json(book)
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
      totalPages,
      summary,
      genres,
      pubYear,
    } = req.body;
    let { bookCover, bookBackground } = req.body;
    const { id } = req.params;

    let book = await PrivateBook.findById(id);

    // Delete old book cover images from cloudinary if they are being updated
    if (bookCover) {
      if (book.bookCover && book.bookCover !== bookCover) {
        await cloudinary.uploader.destroy(
          book.bookCover.split("/").pop().split(".")[0]
        );
      }

      if (book.bookCover !== bookCover) {
        const uploadedResponse = await cloudinary.uploader.upload(bookCover);
        bookCover = uploadedResponse.secure_url;
      }
    }

    // Delete old background images from cloudinary if they are being updated
    if (bookBackground) {
      if (book.bookBackground && book.bookBackground !== bookBackground) {
        await cloudinary.uploader.destroy(
          book.bookBackground.split("/").pop().split(".")[0]
        );
      }

      if (book.bookBackground !== bookBackground) {
        const uploadedResponse = await cloudinary.uploader.upload(
          bookBackground
        );
        bookBackground = uploadedResponse.secure_url;
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
      (book.bookBackground = bookBackground || book.bookBackground)

    book = await book.save();
    return res.status(200).json(book);
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBooksByStatus = async (req, res) => {
  const { status } = req.params;
  const user = req.user;

  try {
    let books

    if (status) {
      books = await PrivateBook.find({
        $and: [{ userId: user._id }, { status: status }],
      });
    } else {
      books = await PrivateBook.find({ userId: user._id });
    }


    return res.status(200).json(booksByStatus);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params;
  console.log("status");

  try {
    const book = await PrivateBook.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const shareBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await PrivateBook.findById(id);

    if (!book) {
      return res.status(404).json({ error: "Private book not found" });
    }

    if (book.shared) {
      if (book.publicBookId) {
        await PublicBook.findByIdAndDelete(book.publicBookId);
      }

      const updatedPrivateBook = await PrivateBook.findByIdAndUpdate(
        id,
        { shared: false, publicBookId: null },
        { new: true }
      );
      return res.status(200).json({
        message: "Book privatized successfully",
        book: updatedPrivateBook,
      });
    }

    // Otherwise, share it
    const { author, title, userId, genres, summary, bookCover, bookBackground, totalPages, pubYear } = book;

    const newPublicBook = new PublicBook({
      author,
      title,
      userId,
      genres,
      summary,
      bookCover,
      bookBackground,
      totalPages,
      pubYear,
    });

    await newPublicBook.save();

    const updatedPrivateBook = await PrivateBook.findByIdAndUpdate(
      id,
      { shared: true, publicBookId: newPublicBook._id },
      { new: true }
    );

    return res.status(201).json({
      message: "Book shared successfully",
      book: updatedPrivateBook,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};


