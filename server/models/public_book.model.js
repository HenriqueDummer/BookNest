import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    totalPages: {
        type: Number,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    genres: [
        {
            type: String,
        }
    ],
    pubYear: {
        type: Number,
    },
    bookCover: {
        type: String,
        default: "https://i.pinimg.com/originals/80/ec/77/80ec77932091113c4970a88f69b9bb4f.gif"
    },
    bookBackground: {
        type: String,
        default: "https://i.pinimg.com/originals/80/ec/77/80ec77932091113c4970a88f69b9bb4f.gif"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
})

const PublicBook = mongoose.model("Public Book", bookSchema)

export default PublicBook