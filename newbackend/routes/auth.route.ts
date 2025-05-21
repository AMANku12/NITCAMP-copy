import { Router } from "express";
import authController from "../controllers/auth.controller"

import { body, validationResult } from "express-validator";
import dotenv from "dotenv";
dotenv.config();


const router = Router();

router.post("/google",[
    body("token").notEmpty().withMessage("Token is required"),
    body("role").isIn(["mentor", "mentee"]).withMessage("Invalid role")
], authController.userController);

router.post("/admin", [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 8}).withMessage("Invalid password length")
], authController.adminController);

router.post("/register/admin",[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({ min: 8}).withMessage("Invalid password length")
], authController.adminRegisterController);

export default router;