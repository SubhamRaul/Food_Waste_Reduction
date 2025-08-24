import {FoodItem} from "../models/foodItem.model.js";

const markAsPickedUp = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        foodItem.status = "picked up";
        await foodItem.save();
        res.status(200).json({ message: "Food item marked as picked up", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const markFoodDelivered = async (req, res) => {
    try {
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        foodItem.status = "delivered";
        await foodItem.save();
        res.status(200).json({ message: "Food item marked as delivered", foodItem });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { 
    markFoodDelivered,
    markAsPickedUp
};