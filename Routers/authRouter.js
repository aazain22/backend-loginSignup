import express from "express"
import { loginValidation, signupValidation } from "../Middlewares/validation.js"
import {signup,  login, getUserInfo } from "../Controllers/authController.js"

const router= express.Router()


router.post('/signup', signupValidation, signup)
router.post('/login', loginValidation, login)
router.get('/user/:email', getUserInfo);

export default router