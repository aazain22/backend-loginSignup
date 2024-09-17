
import mongoose from "mongoose";

const Schema= mongoose.Schema;

const userSchema= new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String,
    required: true
   }, 
  profilePhoto: { type: String },
  
    

    
})

const userModel= mongoose.model('users', userSchema)
export default userModel

