import mongoose from "mongoose"

const chaptersSchema = mongoose.Schema
(
    {
        title: String,
        content: String,
        storyid: String
    }
)

export default mongoose.model("chapters",chaptersSchema)