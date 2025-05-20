import {
  getMentor,
  getMentorCount,
  postMentorRegistration,
  patchMentorUpdation,
} from "../controllers/mentor";
import { Router } from "express";

const mentorRouter = Router();

// The order matters here, the parameterized API should be on the bottom otherwise it will cause a conflict
mentorRouter.get("/count", getMentorCount); // tested
mentorRouter.get("/:id", getMentor);
mentorRouter.post("/register", postMentorRegistration); // tested
mentorRouter.patch("/update/:id", patchMentorUpdation); // tested

export { mentorRouter };
