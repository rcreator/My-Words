import mongoose from "mongoose"

const messagesSchema = mongoose.Schema
(
    {
        password : String,
        username: String, 
        email: String,
        authSource: Number
    }
)

export default mongoose.model("users",messagesSchema)