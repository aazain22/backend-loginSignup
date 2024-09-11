

// const mongoose= require('mongoose')

// const mongo_url= process.env.MONGO_CONN;

// mongoose.connect(mongo_url)
// .then(()=> {
//     console.log('mongodb connected');
    
// }).catch((err) => {

//     console.log('mongodb error', err);
    
// })
import mongoose from "mongoose";
import dotenv from "dotenv"
import colors from "colors"

const connectDB= async ()=> {
try{
const conn= await mongoose.connect(process.env.MONGO_CONN)
console.log(`connected to mongodb database ${mongoose.connection.host}`.bgMagenta.white);


}catch(error){
console.log(`mongodb error ${error}`.bgRed.white);

}


}
export default connectDB
