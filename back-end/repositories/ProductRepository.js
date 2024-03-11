import Image from '../models/Image.js'
import Product from '../models/Product.js'

async function createProduct(newProduct){
    const {name,price, image, category} = newProduct
    try{
        const saveProduct = await Product.create({
            name,
            price,
            image: [],
            category,
            comments:[]
        })
        .then(docProduct => {
            image.map(({url, caption, path}) => {
                Image.create({
                    url,
                    caption,
                    path,
                    createAt: Date.now()
                })
                .then( docImage => {
                    return Product.findByIdAndUpdate(docProduct._id, {
                        $push: {
                            image: {
                                _id: docImage._id,
                                url: url,
                                caption: caption
                            }
                        }
                    })
                })
            })
        })

        return {
            status: "OK",
            data: newProduct
        }
    }catch(err){
        throw new Error(err)
    }
}

async function getAllProduct(){
    try{
        const result = await Product.find({}).populate("comments._id").populate("category")
        return {
            status: "OK",
            data: result
        }
    }catch(err){
        throw new Error(err)
    }
}

async function getAProduct(id){
    try{
        const result = await Product.findById(id)
        return {
            status: "OK",
            data: result
        }
    }catch(err){
        throw new Error(err)
    }
}
const deleteProductById = async (id) => {
    try {
      const deletedProduct = await Product.findOneAndDelete({ _id: id });
  
      if (!deletedProduct) {
        return null; 
      }
      return deletedProduct;
    } catch (error) {
      console.error(error);
      throw new Error("Product student failed");
    }
  };

  const updateProductById = async (id, updatedProduct) => {
    try {
        const updatedProductData = await Product.findByIdAndUpdate(id, updatedProduct, { new: true });

        if (!updatedProductData) {
            return null;
        }

        return updatedProductData;
    } catch (error) {
        console.error(error);
        throw new Error("Update product failed");
    }
};
   



export default{
    createProduct,
    getAllProduct,
    getAProduct,
    deleteProductById,
    updateProductById
}