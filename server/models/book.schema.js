import mongoose from "mongoose";

export const bookSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
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
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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

const Book = mongoose.model("Book", bookSchema);

export default Book;