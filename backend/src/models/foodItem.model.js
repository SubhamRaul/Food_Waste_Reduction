import mongoose, { Schema } from "mongoose";
const FoodEnum = ["available" , "donated" , "expired","picked up"];


const FoodSchema = new Schema({
    donor:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    ngo:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    volunteer:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    Foodname:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    },
    expiryDate:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:FoodEnum,
        requireed:true,
    }
} , {timestamps:true})

export const FoodItem = mongoose.model("FoodItem" , FoodSchema);