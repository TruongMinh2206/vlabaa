
import express from 'express'
import CategoryController from '../controllers/CategoryController.js'
const categoriesRouter = express.Router()

categoriesRouter.get('/getAll', CategoryController.getAllCategories)
categoriesRouter.post('/createCategory', CategoryController.createCategory)

export default categoriesRouter
