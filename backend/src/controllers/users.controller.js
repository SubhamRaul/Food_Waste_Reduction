import {User} from "../models/donors.model.js"
import {z} from "zod";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password alteast 6 characters long" }),
  pincode: z.
    number()
    .int()
    .min(100000 , {message : "pincode 6 digit required"})
    .max(999999 , {message: "pincode must be 6 digit"}),
});

const registerUser = async (req , res) => {
    try {
        const {name,email,password,address,pincode,type} = req.body;

        if([name,email,password,address,pincode,type].some((field)=> field?.trim === "")){
            return res.status(400).json({message:"Enter values in all the fields."})
        }

        // const validation = userSchema.safeParse({email , password , pincode});
        // if(!validation.success){
        //     const errorMessage = validation.error.errors.map((err) => err.message);
        //     return res.status(400).json({ errors: errorMessage });
        // }

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User is already Registered"});
        }

        const hashPassword = await bcrypt.hash(password , 8);

        const newUser = new User({
            name,email,password : hashPassword,address,pincode,type
        });
        await newUser.save();
        const createdUser = await User.findOne({email}).select("-password -address -createdAt -updatedAt");
        res.status(201).json({createdUser, message:"User Created successfully."})

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error while registering User!"})
    }


}

const loginuser = async (req,res) => {
    try {
        const {email,password} = req.body;
    
        const user = await User.findOne({email});
        if(!user){
            return res.status(402).json({message:"User not Found"});
        }
    
        const ispasswordcorrect = await bcrypt.compare(password , user.password);
        if(!ispasswordcorrect){
            return res.status(404).json({message:"Wrong password provided."})
        }
    
        const accessToken = user.generateAcessToken();

        const loggedInUser = await User.findById(user._id).select("-password -address -name -createdAt -updatedAt");

        const options = {
            httpOnly : true,
            secure: true,
        }
    
        return res
        .status(200)
        .cookie("accesstoken" , accessToken , options)
        .json({
            loggedInUser,
            message:"User logged in successfully!"
        })
    } catch (error) {
        return res.status(500).json({message:"error while logging in"})
    }
}

const logoutUser = async(req,res) => {

    const options = {
        httpOnly : true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("accesstoken" , options)
    .json({
        message:"User loggedOut Successfully."
    })
}

const updateProfile = async(req,res) => {
    try {
        const {email,password,address,pincode} = req.body;
        const token = req.cookies?.accesstoken;
        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken._id);
        
        if(email){
            user.email = email;
        }
        if(password){
            user.password = password;
        }
        if(address){
            user.address = address;
        }
        if(pincode){
            user.pincode = pincode;
        }

        await user.save();

        return res.status(200).json({message:"updated profile successfully!."})

    } catch (error) {
        return res.status(500).json({message:"error while updating profile."})
    }
}

export {
    registerUser,
    loginuser,
    logoutUser,
    updateProfile
}