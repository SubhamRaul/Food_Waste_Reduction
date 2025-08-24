import {FoodItem} from "../models/foodItem.model.js";
import {User} from "../models/donors.model.js";

const markAsPickedUp = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        if(req.user.type !== "volunteer" ){
            return res.status(403).json({ message: "Action is Forbidden" });
        }
        foodItem.status = "picked up";
        await foodItem.save();
        res.status(200).json({ message: "Food item marked as picked up", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const fetchAllFoodItems = async (req, res) => {
    try {
        if(req.user.type !== "volunteer" ){
            return res.status(403).json({ message: "Action is Forbidden" });
        }
        const pincode = req.params.pin;
        if(req.user.pincode != pincode){
            return res.status(400).json({ message: "You can only fetch food items in your area" });
        }
        const users = await User.find({ pincode  });
        console.log(users);
        
        const foodItems = await FoodItem.find({ donor: { $in: users.map(user => user._id) } });
        res.status(200).json({ foodItems, message: "Food items retrieved successfully" });
    } catch (error) {
        res.status(500).json({ message: "error while fetching food items" });
    }
};

export {
    markAsPickedUp,
    fetchAllFoodItems
};