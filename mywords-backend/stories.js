import mongoose from "mongoose"

const storiesSchema = mongoose.Schema
( 
    {
        title: String,
        storytype: String,
        userid: String,
        username: String
    }
)

export default mongoose.model("stories",storiesSchema)