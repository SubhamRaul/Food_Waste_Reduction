import { FoodItem } from "../models/foodItem.model.js";


const markAsDelivered = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        if(foodItem.status === "donated"){
            return res.status(400).json({ message: "Food item is already delivered." });
        }
        if(req.user.type !== "ngo"){
            return res.status(403).json({ message: "Action is Forbidden" });
        }
        foodItem.status = "donated";
        await foodItem.save();
        res.status(200).json({ message: "Food item marked as donated", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { markAsDelivered };