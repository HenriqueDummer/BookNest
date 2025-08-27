import PrivateBook from "../models/private_book.model.js";
import { v2 as cloudinary } from "cloudinary";
import PublicBook from "../models/public_book.model.js";

export const getMyBooks = async (req, res) => {
  try {
    const { status } = req.query;
    const user = req.user;

    const filter = { userId: user._id };

    if (status && status !== "all") {
      filter.status = status;
    }

    const books = await PrivateBook.find(filter).select("author title bookCover totalPages currentPage genres pubYear status isPublic");

    return res.status(200).json(books);

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getPublicBooks = async (req, res) => {
  try {
    const books = await PublicBook.find()
      .select("author title bookCover totalPages currentPage genres pubYear status sharedBy isPublic")
      .populate("sharedBy", "username");

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
      summary,
      genres,
      pubYear,
      bookCover,
      bookBackground,
      createdBy: userId
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

    const privateBook = await PrivateBook.findById(id)
    if (!privateBook) {
      return res.status(400).json({ error: "Book not found!" })
    }

    // If the book is shared, delete the public book as well
    let publicBook;
    if (privateBook.shared && privateBook.publicBookId) {
      publicBook = await PublicBook.find({ _id: privateBook.publicBookId, sharedBy: privateBook.userId });
    }

    await cloudinary.uploader.destroy(
      privateBook.bookCover.split("/").pop().split(".")[0],
      publicBook !== undefined ?? publicBook.bookCover.split("/").pop().split(".")[0]
    );

    await cloudinary.uploader.destroy(
      privateBook.bookBackground.split("/").pop().split(".")[0],
      publicBook !== undefined ?? publicBook.bookBackground.split("/").pop().split(".")[0]
    );

    await PrivateBook.findByIdAndDelete(id)
    await PublicBook.findByIdAndDelete(privateBook.publicBookId);

    res.status(200).json(privateBook)
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

export const getBookById = async (req, res) => {
  const { id } = req.params;
  console.log("status");

  try {
    let book = await PrivateBook.findById(id);
    if (!book) {
      book = await PublicBook.findById(id).populate("sharedBy", "username profileImg").populate("characters");
    }

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err)
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

    if (book.sharedBy) {
      return res.status(400).json({ error: "You can't share copied books" });
    }

    // If the book is already shared, privatize it
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
    const { author, title, genres, summary, bookCover, bookBackground, totalPages, userId, pubYear, createdBy } = book;

    const newPublicBook = new PublicBook({
      author,
      title,
      genres,
      summary,
      bookCover,
      bookBackground,
      totalPages,
      pubYear,
      sharedBy: userId,
      createdBy
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

export const copyBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    const publicBook = await PublicBook.findById(id);
    if (!publicBook) {
      return res.status(404).json({ error: "Public book not found" });
    }

    if (publicBook.sharedBy.toString() === user._id.toString()) {
      return res.status(400).json({ error: "You cannot copy your own public book" });
    }

    const {
      title,
      author,
      totalPages,
      summary,
      genres,
      pubYear,
      bookCover,
      bookBackground
    } = publicBook;

    const copiedBook = await new PrivateBook({
      userId: user._id,
      title,
      author,
      totalPages,
      summary,
      genres,
      pubYear,
      bookCover,
      bookBackground,
      copiedFrom: publicBook._id,
    })

    if (copiedBook) {
      copiedBook.save();
      return res.status(201).json(copiedBook);
    } else {
      return res.status(400).json({ error: "Could not copy book" });
    }

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const updateProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedCurrentPage } = req.body;

    const book = await PrivateBook.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found!" })
    }

    book.currentPage = updatedCurrentPage;
    await book.save();

    return res.status(200).json(book);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
}

