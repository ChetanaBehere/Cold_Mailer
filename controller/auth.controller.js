import User from "../model/auth.model.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const RegisterUser = async(req, res) =>{
    try{
        const {name, email, password, domain, skills} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            });
        }
        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters"
            });
        }
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        const  hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            domain,
            skills
        });
        return res.status(201).json({
            success: true,
            message: "User registered successfully", user
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
        
    }


}

export const loginUser = async(req, res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }
        const user = await User.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token  = jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        const userResponse = user.toObject();
        delete userResponse.password;

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: userResponse,
            token
        });
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}