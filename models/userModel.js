import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema= new mongoose.Schema({
   name:{
    type:String,
    required:[true,'Name is required']
   } ,
   email:{
    type:String,
    required:[true,'email is required'],

   },
  password:{
    type:String,
    required:[true,'password is required'],
   
    
  } ,
  confirmPassword:{
    type:String,
    required:[true,'confirm password is required'],
    validate:{
      validator:function(el){
        return el===this.password
      },
      message:'the password is not matching'
    }
  },
  role:{
type:String,

enum:{
  values:['user','admin','merchant','moderator'],
  message:'Enter the correct role'
},
default:'user'
  },
  active:{
    type:Boolean,
    default:true,
    select:false
  },
  passwordChangedTimeStamp:Date
})
userSchema.pre('save',async function(next){
  //this //document
  if(!this.isModified('password')) return next()
  this.password=await bcrypt.hash(this.password,12)
  this.passwordChangedTimeStamp=Date.now()-1000
  this.confirmPassword=undefined
  next()
})
userSchema.methods.validatePassword=async function(clientPassword,dbPassword){
  return await bcrypt.compare(clientPassword,dbPassword)
}
userSchema.methods.tokenPasswordValidation=function(tokenIssueDate){
  // console.log(tokenIssueDate,this.passwordChangedTimeStamp)
  if(this.passwordChangedTimeStamp){
    const passwordChanged=Math.floor(this.passwordChangedTimeStamp.getTime()/1000)
    return tokenIssueDate>passwordChanged
  }
  return false
}

const User= mongoose.model('User',userSchema)
export default User