import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profileImg: {
        type: String,
        default: "https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg"
    },
    bio: {
        type: String,
    },
    books: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book"
        },
        status: {
            type: String,
            enum: ["reading", "read", "want_to_read"],
            default: "want_to_read"
        },
        
    }]
})

const User = mongoose.model("User", userSchema)

export default User