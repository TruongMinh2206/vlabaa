import mongoose, {ObjectId, Schema} from "mongoose"

const Product = mongoose.model("Product", new Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        },
        url:{
            type: String, 
            require: true
        },
        caption:{
            type: String,
            require: true
        }
    }],
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        require: true
    },
    comments:[{
        _id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    }]
}))

export default Product
