import jwt from "jsonwebtoken"
import userModel from "../Models/user.js"
import bcrypt from "bcrypt"


export const signup = async(req, res) => {
try{
const {name, email, password} = req.body
const user =  await userModel.findOne({email})
if(user){
    return res.status(409)
    .json({message: 'user already exists', success: false})
}
const Model= new userModel({name, email, password})
 Model.password = await bcrypt.hash(password, 10)
 await Model.save()
 res.status(201).json({
    message: 'signup successfully',
    success: true
 })

}catch(err){
    res.status(500).json({
        message: 'signup failed',
        success: false
     })
}

}

export const login = async(req, res) => {
    try{
    const {email, password} = req.body
    const user =  await userModel.findOne({email})
    const errMsg= 'auth failed no user found'
    if(!user){
        return res.status(403)
        .json({message: errMsg, success: false})
    }
   const isPassEqual= await bcrypt.compare(password, user.password)
   if(!isPassEqual){
    return res.status(403)
        .json({message: errMsg, 
            success: false})
   }
   const jsonwebtoken= jwt.sign({email: user.email, _id: user._id},
    process.env.JWT_SECRET,
    {expiresIn: '24h'}
   )
     res.status(200).json({
        message: 'logged in successfully',
        success: true,
        jsonwebtoken,
        email,
       name: user.name
     })
    
    }catch(err){
        res.status(500).json({
            message: 'internal server error',
            success: false
         })
    }
    
    }

    export const getUserInfo = async (req, res) => {
        try {
          const { email } = req.params;
          
          
          if (!email) {
            return res.status(400).json({
              message: "Email parameter is required",
              success: false,
            });
          }
      
          const user = await userModel.findOne({ email });
          
          
          if (!user) {
            return res.status(204).json({
              message: "User not found",
              success: false,
            });
          }
      
          
          res.status(200).json({
            message: "User data retrieved successfully",
            success: true,
            data: {
              email: user.email,
              name: user.name,
              _id: user._id
            }
          });
        } catch (err) {
          res.status(500).json({
            message: "Error retrieving user data",
            success: false,
          });
        }
      }; 