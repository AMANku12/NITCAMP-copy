import {
  menteeRead,
  menteeCount,
  menteeRegistration,
  menteeUpdation,
  menteePromotion,
} from "../services/mentee";
import { MenteeModel, MenteeRequestDefinition } from "../types/mentee";
import { Request, Response, NextFunction } from "express";

/**
 * GET /api/mentee/{id}
 * @summary Retrieve details about a mentee.
 * @tags Mentee
 * @param {string} id.path.required - The id of the mentee.
 * @returns {MenteeModel} 200 - Success response.
 * @returns {object} 404 - Not Found response.
 */
const getMentee = async (req: Request, res: Response, next: NextFunction) => {
  let details: MenteeModel | null = null;

  // Attempt to query the DB for the user object and forward any errors to the
  // global error handling middleware.
  try {
    details = await menteeRead(parseInt(req.params.id));
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
 * GET /api/mentee/count
 * @summary Retrieve the count of mentees.
 * @tags Mentee
 * @returns {number} 200 - Success response.
 */
const getMenteeCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await menteeCount());
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/mentee/register
 * @summary Register a new mentee.
 * @tags Mentee
 * @param {MenteeRequestDefinition} request.body.required - Mentee details.
 * @returns {object} 200 - Success response.
 * @returns {object} 400 - Bad Request response.
 */
const postMenteeRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Validation and return 400 for invalid inputs
  // return res
  //   .status(400)
  //   .json({ message: "Mentee registration details were invalid." });

  try {
    await menteeRegistration(req.body);
    return res.json({ message: "Mentee registered successfully." });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/mentee/update/{id}
 * @summary Update existing mentee details.
 * @tags Mentee
 * @param {number} id.path.required - The id of the mentee.
 * @param {MenteeRequestDefinition} request.body.required - Updated mentee details.
 * @returns {object} 200 - Success response.
 * @returns {object} 400 - Bad Request response.
 */
const patchMenteeUpdation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // TODO: Validation and return 400 for invalid inputs
  // return res
  //   .status(400)
  //   .json({ message: "Mentee registration details were invalid." });

  // TODO: Return 404 if mentee not found.

  try {
    await menteeUpdation(parseInt(req.params.id), req.body);
    return res.json({
      message: "Mentee details have been updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

// TODO: Test and set up swagger
const postMenteePromotion = async (req: Request, res: Response) => {
  try {
    const promotedEntry = await menteePromotion(
      parseInt(req.params.id),
      req.body.maxMentees,
      req.body.mentoringType
    );
    return res.json(promotedEntry);
  } catch (err) {}
};

export {
  getMentee,
  getMenteeCount,
  postMenteeRegistration,
  patchMenteeUpdation,
  postMenteePromotion,
};
