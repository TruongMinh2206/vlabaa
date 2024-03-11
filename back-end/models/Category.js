import mongoose, {ObjectId, Schema} from "mongoose";

const  Category = mongoose.model("Category", new Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    }

}))

export default Category