import dotenv from "dotenv"
import express from "express"
import connectDB from "./Models/db.js";
import colors from "colors"
import cors from "cors"
import morgan from "morgan"
import bodyParser from "body-parser";

import authRouter from "./Routers/authRouter.js"


dotenv.config()
connectDB()

const app= express()
// const bodyParser= bodyParser()



const PORT= process.env.PORT || 8080
app.get('/ping', (req,res)=> {
res.send('PONG')
})


//middlewares
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use('/auth',authRouter)
app.use(morgan("dev"))

app.listen(PORT, ()=> {
    console.log(`server is running on ${PORT}`);
    
})
