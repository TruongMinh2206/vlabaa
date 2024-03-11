import mongoose, {ObjectId, Schema} from "mongoose";

const  Comment = mongoose.model("Comment", new Schema({
   user:{
        type: String, 
        require: true
    },
    text:{
        type: String,
        require: true
    },
    createAt:{
        type: Date
    }

}))

export default Comment