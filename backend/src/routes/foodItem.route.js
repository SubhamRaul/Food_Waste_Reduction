import {Router} from 'express';
import {verifyJWT} from '../middlewars/auth.middleware.js';
import {createFoodItem,
    getFoodItems, 
    getFoodItemById, 
    deleteFoodItem
} from '../controllers/foodItem.controller.js';
import {markAsDelivered} from '../controllers/ngo.controller.js';
import {markAsPickedUp , fetchAllFoodItems } from '../controllers/volunteer.controller.js';

const router = Router();

// Food Item routes
router.post('/', verifyJWT, createFoodItem);
router.get('/', verifyJWT, getFoodItems);
router.get('/:id', verifyJWT, getFoodItemById);
router.delete('/:id', verifyJWT, deleteFoodItem);

// Volunteer routes
router.put('/:id/pickup', verifyJWT, markAsPickedUp);
router.get('/:pin/fetchFoodItems', verifyJWT, fetchAllFoodItems);

// NGO routes
router.put('/:id/deliver', verifyJWT, markAsDelivered);

export default router;