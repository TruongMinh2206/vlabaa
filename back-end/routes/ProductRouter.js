import express from 'express'
import ProductController from '../controllers/ProductController.js'
const ProductRouter = express.Router()

ProductRouter.get('/getAll',ProductController.getAllProduct)
ProductRouter.post('/createProduct', ProductController.createProduct)
ProductRouter.get('/:id', ProductController.getAProduct)
ProductRouter.delete('/delete/:id', ProductController.deleteProductById)
ProductRouter.patch('/update/:id', ProductController.updateProductById)
export default ProductRouter