import ProductRepository from "../repositories/ProductRepository.js";

const createProduct = async(req, res) => {
    try{
        const saveProduct = await ProductRepository.createProduct(req.body)
        if(!saveProduct){
            res.status(500).json("Can not create")
        }else{
            res.status(200).json(saveProduct)
        }
    }catch(err){
        res.status(500).json("Can not create Product")
    }
}

const getAllProduct = async(req, res)=>{
    try{
        const result = await ProductRepository.getAllProduct();
        if(!result){
            res.status(500).json("Can not get")
        }else{
            res.status(200).json(result)
        }
    }catch(err){
        res.status(500).json("Can not get Products")
    }
}

const getAProduct = async(req, res) => {
    try{
        const result = await ProductRepository.getAProduct(req.params.id)
         res.status(200).json(result)
    }catch(err){
        res.status(500).json(err)
    }
}
const deleteProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const deletedProduct = await ProductRepository.deleteProductById(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'product not found' });
      }
      return res.status(200).json({ message: 'product deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

  const updateProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedProductData = req.body; // Get the updated product data from the request body
      const updatedProduct = await ProductRepository.updateProductById(id, updatedProductData);
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

export default{
    createProduct, getAllProduct, getAProduct, deleteProductById,
    updateProductById
}