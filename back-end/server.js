import express from "express"
import * as dotenv from 'dotenv'
import connectDB from "./database/database.js"
import categoriesRouter from "./routes/CategoryRouter.js"
import ProductRouter from "./routes/ProductRouter.js"
import bodyParse from 'body-parser'
import CommentRouter from "./routes/CommentRouter.js"
import cors from 'cors'
// Khai báo 1 middleware

dotenv.config()
const app = express()
app.use(bodyParse.json({limit: "50mb"}))
app.use(cors({origin: true, credentials: true}))
app.use(express.json()) // Config cho express lam viec voi du lieu theo dinh dang json
// Thiết 1 middleware để kiểm soát mọi request đi đến express server

// Routes: Root Router
app.get('/', (req, res)=>{
    res.send("Welcome to Home RESTful API")
})

// Routes:
app.use('/api/category', categoriesRouter)
app.use('/api/product', ProductRouter)
app.use('/api/comment', CommentRouter)

const port = process.env.PORT || 8080

app.listen(port, ()=>{
    connectDB()
    console.log(`Server is running on port ${port}`);
})