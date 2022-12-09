import mongoose  from "mongoose";
const productSchema = new mongoose.Schema({
//  name:{
//     type:String,
//     // required:[true,'Product name is mandatory'],
//     unique:true
//   } ,
id:{
  type:Number
},
  price:{
    type:Number,
    

  },
  title:{
    type:String,
  
  },
  description:{
    type:String,
  },
  // color:{
  //   type:String
  // } ,
  // material:{
  //   type:String
  // } ,
  // resolution:{
  //   type:String
  // } ,
  // type:{
  //   type:String
  // } ,
  // size:{
  //   type:String
  // }, 
  // color:{
  //   type:String
  // } ,
  discountPercentage:{
type:Number
  },
  rating:{
    type:Number
  },
  stock:{
    type:Number
  },
  brand:{
    type:String 
  },
  category:{
    type:String 
  },
  thumbnail:{
    type:String 
  },
  images:{
    type:[String ]
  },
  discount:{
    type:Boolean
  } ,
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
}

)
productSchema.virtual('categoryy').get(function(){
  if(this.price>100000) return 'Premium'
  else if(this.price>30000&&this.price<=100000) return"Mid Range"
  return "low range"
})
const Products= mongoose.model('product2',productSchema)
export default Products