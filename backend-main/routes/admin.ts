import {
	getAdminViewPairs,
	postAdminMatchPairs,
	getAdminRegFormWindow,
	patchAdminRegFormWindow,
} from "../controllers/admin";

import { Router } from "express";

const adminRouter = Router();

adminRouter.get("/match", getAdminViewPairs); // tested
adminRouter.post("/match", postAdminMatchPairs);
adminRouter.get("/reg-form/open-window", getAdminRegFormWindow);
adminRouter.patch("/reg-form/set-window", patchAdminRegFormWindow);

export { adminRouter };