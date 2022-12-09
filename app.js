import './config.js'
import express from "express"
import productRoute from "./routes/productRoutes.js"
import userRoute from "./routes/userRoutes.js"
import applicationErrors from './controllers/errorHandleController.js'
import cors from 'cors'
const app=express()
app.use(express.json())
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*")
    next()
})
app.use(cors())
app.use('/api/v1/product',productRoute)
app.use('/api/v1/user',userRoute)
app.use(applicationErrors)
export default app;