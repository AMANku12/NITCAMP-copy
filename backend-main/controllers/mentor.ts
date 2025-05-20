import {
  mentorRead,
  mentorCount,
  mentorRegistration,
  mentorUpdation,
} from "../services/mentor";
import { MentorRequestDefinition, MentorModel } from "../types/mentor";
import { Request, Response, NextFunction } from "express";

/**
 * GET /api/mentor/{id}
 * @summary Retrieve details about a mentor.
 * @tags Mentor
 * @param {string} id.path.required - The id of the mentor.
 * @returns {MentorModel} 200 - Success response.
 * @returns {object} 404 - Not Found response.
 */
const getMentor = async (req: Request, res: Response, next: NextFunction) => {
  let details: MentorModel | null = null;

  // Attempt to query the DB for the user object and forward any errors to the
  // global error handling middleware.
  try {
    details = await mentorRead(parseInt(req.params.id));
  } catch (error) {
    next(error);
  }

  if (details == null) {
    return res
      .status(404)
      .json({ message: "No mentor found with the given ID." });
  }

  return res.json(details);
};

/**
 * GET /api/mentor/count
 * @summary Retrieve the count of mentors.
 * @tags Mentor
 * @returns {number} 200 - Success response.
 */
const getMentorCount = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await mentorCount());
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/mentor/register
 * @summary Register a new mentor.
 * @tags Mentor
 * @param {MentorRequestDefinition} request.body.required - Mentor details.
 * @returns {object} 200 - Success response.
 * @returns {object} 400 - Bad Request response.
 */
const postMentorRegistration = async (
  req: Request<MentorRequestDefinition>,
  res: Response,
  next: NextFunction
) => {
  // TODO: Validation and return 400 for invalid inputs
  // return res
  //   .status(400)
  //   .json({ message: "Mentor registration details were invalid." });

  try {
    await mentorRegistration(req.body);
    return res.json({ message: "Mentor registered successfully." });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/mentor/update/{id}
 * @summary Update existing mentor details.
 * @tags Mentor
 * @param {number} id.path.required - The id of the mentor.
 * @param {MentorRequestDefinition} request.body.required - Updated mentor details.
 * @returns {object} 200 - Success response.
 * @returns {object} 400 - Bad Request response.
 */
const patchMentorUpdation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Validation and return 400 for invalid inputs
  // return res
  //   .status(400)
  //   .json({ message: "Mentor registration details were invalid." });

  // TODO: return 404 if mentor not found

  try {
    await mentorUpdation(parseInt(req.params.id), req.body);
    return res.json({
      message: "Mentor details have been updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getMentor,
  getMentorCount,
  postMentorRegistration,
  patchMentorUpdation,
};
