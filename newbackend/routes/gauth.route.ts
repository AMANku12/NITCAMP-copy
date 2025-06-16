import {Router} from "express";
import gAuthController from "../controllers/gauth.controller";

const router = Router();

router.post("/google", gAuthController);

export default router;