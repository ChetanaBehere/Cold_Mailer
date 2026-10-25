import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectdb = async() => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected");
    }

    catch(e){
        console.log(e.message);
    }
}

export default connectdb;