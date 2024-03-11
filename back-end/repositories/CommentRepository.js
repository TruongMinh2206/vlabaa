import Comment from "../models/Comment.js"
import Product from "../models/Product.js"

async function getAllComment(){
    try{
        const result = await Comment.find({})
        if(!result){
            return {
                status: "FAIL",
                message: "Can not get All Comment"
            }
        }else{
            return{
                status: "OK",
                message: "Successfully",
                data: result
            }
        }
    }catch(err){
        throw Error(err)
    }
} 

async function createComment(newComment, id){
        const {user, text} = newComment
    try{
        const saveComment = await Comment.create({
            user,
            text,
            createAt: Date.now()
        })
        const saveProduct = await Product.findByIdAndUpdate(id)
        await saveProduct.updateOne({
            $push: {
                comments: {
                    _id:saveComment._id
                }
            }
        })
        if(saveComment){
            return {
                status: "OK",
                data: saveComment,
                data1: saveProduct
            }
        }else{
            return {
                status: "FAIL"
            }
        }
    }catch(err){
        throw Error(err)
    }
} 

async function getAComment(id){
    try{
        const result = await Comment.findById(id)
            return {
                status: "OK",
                data: result
            }
        
    }catch(err){
        throw Error(err)
    }
}

export default {
    getAllComment,
    createComment,
    getAComment
}