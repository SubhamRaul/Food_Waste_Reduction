import mongoose, { Schema } from "mongoose"
const enumSchema = ["donor" , "ngo" , "volunteer"];
import jwt from "jsonwebtoken"
const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password:{
        type:String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    address: {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: enumSchema,
        required: true,
        lowercase:true
    }
}, { timestamps: true })

usersSchema.methods.generateAcessToken = function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name,
            type:this.type
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : process.env.ACCESS_TOKEN_EXPIRES_IN}
    )
}


export const User = mongoose.model("User" , usersSchema);