import Products  from "../models/productModel.js"
import catchApiErrors from "../utils/catchApiErrors.js"
import AbstractOptions from "../utils/AbstractOptions.js"
import AbstractApplicationError from "../utils/AbstractApplicationError.js"
const createProduct =catchApiErrors( async(req,res)=>{
  
        const product=await Products.create(req.body)
        res.status(201).json({
            status:'success',
            
            data:{
                product
            }
        })
    
    })


const getProduct = catchApiErrors(async (req,res,next)=>{
   
    console.log(req.query)
    //price:{'$gte':58700}
    //name:'iphone12',price:{'$gte':58700}
    //product?price[lte]=58800&discount=true
    //filteration

    // queryString=queryString.replace(/\b(gte|gt|lte|lt)\b/g,str=>`$${str}`)
  
    //sorting

    let query= Products.find()
    const options= new AbstractOptions(query,req.query)
   options.filter().sort().fieldFilter().pagination();
 
    
    //field setup
  
    //pagination
   
    const product = await query
   
    console.log(product)
    res.status(200).json({
        status:'success',
        results:product.length,
        data:product
    })
//    }catch(err){
//    next(err) //if u send anything in next it will be considered as error

// }
})
const getProductById = catchApiErrors(async (req,res)=>{

     const product = await Products.findById(req.params.id)
     res.status(200).json({
         status:'success',
         results:product.length,
         data:product
     })
    }
 )
 const updateProduct = catchApiErrors( async (req,res)=>{
  
     const product = await Products.findByIdAndUpdate(req.params.id,req.body,{
        new:true
     })
     res.status(200).json({
         status:'success',
         results:product.length,
         data:product
     })
 })
 const updateProductAfterFiltering = catchApiErrors(async (req,res)=>{
  
     const product = await Products.updateMany(req.query,req.body,{
        new:true
     })
     res.status(200).json({
         status:'success',
         results:product.length,
         data:product
     })
    })
 
 const deleteProduct = catchApiErrors(async (req,res)=>{
  
     const product = await Products.deleteMany(req.body)
      
     res.status(200).json({
         status:'success',
         results:product.length,
         data:product
     })
    })
    const getUniqueIphone=catchApiErrors(async(req,res,next)=>{
        let query =Products.findOne();
        const product=await query;
        console.log("unique iphone");
        if(!product){
            return next(new AbstractApplicationError("No resourse found!",404))
        }
    })
 
export {getProduct,createProduct,getProductById,updateProduct,updateProductAfterFiltering,deleteProduct}