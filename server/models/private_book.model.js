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
    },
    notes: [
        {
            chapter: {
                type: Number
            },
            page: {
                type: Number
            },
            content: {
                type: String,
                required: true
            },
            color: {
                type: String,
                enum: [
                    "rgba(249,115,22)",
                    "rgba(30, 144, 255)",
                    "rgba(60, 179, 113)",
                    "rgba(255, 140, 0)",
                    "rgba(220, 20, 60)",
                    "rgba(0, 191, 255)",
                    "rgba(255, 99, 71)",
                    "rgba(148, 0, 211)",
                    "rgba(72, 61, 139)",
                    "rgba(46, 139, 87)"
                ]
            }
        }
    ],
    characters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Character"
        }
    ]
})

const PrivateBook = mongoose.model("Private Book", privateBookSchema)

export default PrivateBook