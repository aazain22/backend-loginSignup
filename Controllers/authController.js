import { upload } from "../Middlewares/uploadMiddleware.js" 
import jwt from "jsonwebtoken"
import userModel from "../Models/user.js"
import bcrypt from "bcryptjs"


// export const signup = async(req, res) => {
// try{
// const {name, email, password, phone} = req.body
// const user =  await userModel.findOne({email})
// if(user){
//     return res.status(409)
//     .json({message: 'user already exists', success: false})
// }
// const Model= new userModel({name, email, password, phone})
//  Model.password = await bcrypt.hash(password, 10)
//  await Model.save()
//  res.status(201).json({
//     message: 'signup successfully',
//     success: true
//  })

// }catch(err){
//     res.status(500).json({
//         message: 'signup failed',
//         success: false
//      })
// }

// }
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await userModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'User already exists',
        success: false
      });
    }

    const profilePhoto = req.file ? req.file.path : null;  // Add file path if uploaded

    const newUser = new userModel({
      name,
      email,
      password,
      phone,
      profilePhoto
    });

    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();

    res.status(201).json({
      message: 'Signup successful',
      success: true
    });
  } catch (err) {
    res.status(500).json({
      message: 'Signup failed',
      success: false
    });
  }
};


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


      export const updateUser = async (req, res) => {
        try {
          const { userId } = req.params;
          // const { name, email, password, phone } = req.body;
      
          const user = await userModel.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
          }
      
         

          const update = await userModel.findOneAndUpdate({ _id: userId }, req.body );
      
          res.status(200).json({ message: "User updated successfully", success: true });
        } catch (error) {
          res.status(500).json({ message: "Failed to update user", success: false });
        }
      };
      
      // Delete user and their profile photo
      export const deleteUser = async (req, res) => {
        try {
          const { userId } = req.params;
      
          const user = await userModel.findById(userId);
      
          if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
          }
      
          // Remove the user's profile photo if it exists
         
      
          await userModel.findByIdAndDelete(userId); // Delete user from database
      
          res.status(200).json({ message: "User deleted successfully", success: true });
        } catch (error) {
          res.status(500).json({ message: "Failed to delete user", success: false });
        }
      };

