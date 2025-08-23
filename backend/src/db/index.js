import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log("Mongodb Connected!");
    } catch (error) {
        console.log("error while connection error : ",error);
        process.exit(1);
    }
}

export {connectDB}