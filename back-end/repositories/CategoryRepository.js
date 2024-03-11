import Category from "../models/Category.js"

async function getAllCategories(){
    try{
        const newCate = await Category.find({})
        return newCate
    }
    catch(err){
        throw new Error(err)
    }
}

async function createCategory(newCategory){
    try{
        const saveCategory = await Category.create({
            name: newCategory.name,
            description: newCategory.description
        })
        return {
            status: "OK",
            data: newCategory
        }
    }catch(err){
        throw new Error(err)
    }
}

export default {
    getAllCategories, createCategory
}