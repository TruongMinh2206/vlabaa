import CategoryRepository from "../repositories/CategoryRepository.js";

const  getAllCategories = async (req, res) => {
    try{
        const result = await CategoryRepository.getAllCategories();
        
            res.status(200).json(result)
        
    }
    catch(err){
        return res.status(500).json(err)
    }
}

const createCategory = async (req, res)=>{
    try{
        const newCategory = await CategoryRepository.createCategory(req.body);
        return res.status(200).json(newCategory)
    }catch(err){
        return res.status(500).json("Can not create")
    }
}

const getACategory = async (req, res) => {
    try{
        // const category = await 
    }catch(err){
        return res.status(500).json("Can not get")
    }
}
export default{
    getAllCategories,
    createCategory,
    getACategory
}