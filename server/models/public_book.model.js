import mongoose from "mongoose";
import { bookSchema } from "./book.schema.js";

export const publicBookSchema = mongoose.Schema({
    ...bookSchema.obj,
    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    isPublic: {
        type: Boolean,
        default: true
    },
})

const PublicBook = mongoose.model("Public Book", publicBookSchema)

export default PublicBook