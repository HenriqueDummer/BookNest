import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    genres: [
        {
            type: String,
        }
    ],
    publicationYear: {
        type: Number,
    },
    bookCover: {
        type: String,
        default: "https://boxshot.com/3d-book-cover/how-to-make-a-3d-book-cover-in-photoshop/sample.jpg"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    currentPage: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["reading", "read", "want_to_read"],
        default: "want_to_read"
    }
})

const Book = mongoose.model("Book", bookSchema)

export default Book