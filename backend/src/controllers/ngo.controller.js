import { FoodItem } from "../models/foodItem.model.js";


const updateFoodStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const foodItem = await FoodItem.findById(req.params.id);
        if (!foodItem) {
            return res.status(404).json({ message: "Food item not found" });
        }
        foodItem.status = status;
        await foodItem.save();
        res.status(200).json(foodItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { updateFoodStatus };