import jwt from "jsonwebtoken"
import {User} from "../models/donors.model.js"

export const verifyJWT = async function(req,res,next){
    try {
        const token = req.cookies.accesstoken;
        if(!token){
            return res.status(400).json({message:"Invalid Access !!!"});
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        req.user = await User.findById(decodedToken._id);
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}