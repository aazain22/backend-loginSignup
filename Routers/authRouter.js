import express from "express"
import { loginValidation, signupValidation } from "../Middlewares/validation.js"
import {signup,  login, getUserInfo, deleteUser, updateUser } from "../Controllers/authController.js"
import { upload } from "../Middlewares/uploadMiddleware.js"
const router= express.Router()


router.post('/signup',upload.single('profilePhoto') ,signup)
router.post('/login', loginValidation, login)
router.get('/user/:email', getUserInfo);

router.patch('/user/update/:userId', updateUser);


router.delete('/user/delete/:userId', deleteUser);

export default router