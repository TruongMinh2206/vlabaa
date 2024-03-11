import mongoose, {ObjectId, Schema} from "mongoose";

const  Image = mongoose.model("Image", new Schema({
    url:{
        type: String,
        require: true
    },
    caption:{
        type: String,
        require: true
    },
    path:{
        type: String,
        require: true
    },
    createAt:{
        type: Date,
    }

}))

export default Image