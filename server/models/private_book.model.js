import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

const privateBookSchema = mongoose.Schema({
    ...bookSchema.obj,
    currentPage: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["reading", "finished", "wishlist"],
        default: "wishlist"
    },
    shared: {
        type: Boolean,
        default: false
    },
    publicBookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Public Book"
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    copiedFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Public Book",
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const PrivateBook = mongoose.model("Private Book", privateBookSchema)

export default PrivateBook