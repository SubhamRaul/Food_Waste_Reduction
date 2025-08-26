import {FoodItem} from "../models/foodItem.model.js";
import {User} from "../models/donors.model.js";

const createFoodItem = async (req, res) => {
    try {
        const {Foodname,quantity,expiryDate,donor,ngo} = req.body;
        const user = await User.findById(donor);
        if(!user || user.type !== "donor"){
            return res.status(403).json({ message: "Action is Forbidden" });
        }
        const newFoodItem = new FoodItem({Foodname,quantity,expiryDate,donor,ngo});
        await newFoodItem.save();
        res.status(201).json({newFoodItem , message: "Food item created successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodItems = async (req, res) => {
    try {
        const foodItems = await FoodItem.find();
        res.status(200).json({ foodItems, message: "Food items retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFoodItemById = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({foodItem , message: "Food item retrieved successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteFoodItem = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        if(foodItem.status === "expired" || foodItem.status === "donated") {
            await FoodItem.findByIdAndDelete(req.params.id);
            return res.status(200).json({message: "Food item deleted successfully"});
        }
        res.status(400).json({ message: "Only expired or donated food items can be deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const FetchAllNgos = async (req , res) => {
    try {
        const pincode = req.params.pin;
        const ngos = await User.find({type:"ngo" , pincode:pincode}).select("-password -email -address");
        res.status(200).json({ ngos , message : "NGOs fetched successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error fetching NGOs" });
    }
};

const markAsDispatched = async (req,res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        foodItem.status = "dispatched";
        await foodItem.save();
        res.status(200).json({ message: "Food item marked as dispatched" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { createFoodItem, getFoodItems, getFoodItemById, deleteFoodItem, FetchAllNgos , markAsDispatched };