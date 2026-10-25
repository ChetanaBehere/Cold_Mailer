import jwt from "jsonwebtoken";
import User from "../model/auth.model.js";
export const authMiddleware = async(req, res, next) =>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId);
        if(!user){
            return res.status(401).json({
                msg:"User not found"
            });
        }
    
        req.user = user;
        next();
    }
    catch(e){
        console.log(e.message);
        return res.status(500).json({
            message: "Token is required"
        });
    }
}