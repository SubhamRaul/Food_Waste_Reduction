import {Router} from 'express';
import {verifyJWT} from '../middlewars/auth.middleware.js';
import {createFoodItem,
    getFoodItems, 
    getFoodItemById, 
    deleteFoodItem
} from '../controllers/foodItem.controller.js';
import {updateFoodStatus} from '../controllers/ngo.controller.js';
import { markFoodDelivered , markAsPickedUp } from '../controllers/volunteer.controller.js';

const router = Router();

// Food Item routes
router.post('/', verifyJWT, createFoodItem);
router.get('/', verifyJWT, getFoodItems);
router.get('/:id', verifyJWT, getFoodItemById);
router.put('/:id', verifyJWT, updateFoodStatus);
router.delete('/:id', verifyJWT, deleteFoodItem);

// Volunteer routes
router.put('/:id/deliver', verifyJWT, markFoodDelivered);
router.put('/:id/pickup', verifyJWT, markAsPickedUp);

export default router;