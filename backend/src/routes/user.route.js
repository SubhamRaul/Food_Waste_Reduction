import {Router} from "express";
import {verifyJWT} from "../middlewars/auth.middleware.js"
import {
    registerUser,
    loginuser,
    logoutUser,
    updateProfile
} from "../controllers/donors.controller.js"
const router = Router();

router.post("/registerUser", registerUser);
router.post("/LoginUser" , loginuser);
router.get("/LogoutUser" ,verifyJWT, logoutUser);
router.post("/UpdateProfile" ,verifyJWT, updateProfile);

export default router;