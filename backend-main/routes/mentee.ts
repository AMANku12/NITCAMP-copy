import {
  getMentee,
  getMenteeCount,
  postMenteeRegistration,
  patchMenteeUpdation,
  postMenteePromotion,
} from "../controllers/mentee";
import { Router } from "express";

const menteeRouter = Router();

// The order matters here, the parameterized API should be on the bottom otherwise it will cause a conflict
menteeRouter.get("/count", getMenteeCount);
menteeRouter.get("/:id", getMentee);
menteeRouter.post("/register", postMenteeRegistration);
menteeRouter.patch("/update/:id", patchMenteeUpdation);
menteeRouter.post("/promote/:id", postMenteePromotion);

export { menteeRouter };
