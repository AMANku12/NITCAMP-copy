import { UserModel } from "./user";

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

/**
 * DTO for mentor details.
 * @typedef {object} MentorModel
 * @property {number} id
 * @property {number} userId
 * @property {number} maxMentees
 * @property {string} mentoringType
 * @property {UserModel} UserInfo
 */
interface MentorModel
  extends Model<
    InferAttributes<MentorModel>,
    InferCreationAttributes<MentorModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  maxMentees: number;
  mentoringType: string;
  userInfo?: UserModel;
}

/**
 * DTO for registering mentor details.
 * @typedef {object} MentorRequestDefinition
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} dept
 * @property {number} yearOfEnrollment
 * @property {string[]} broadAreas
 * @property {string[]} narrowAreas
 * @property {number} maxMentees
 * @property {string} mentoringType
 */
type MentorRequestDefinition = {
  name: string | null;
  phone: string | null;
  email: string | null;
  dept: string | null;
  yearOfEnrollment: number | null;
  broad_areas: string[] | null;
  narrow_areas: string[] | null;
  maxMentees: number | null;
  mentoringType: string | null;
};

export { MentorRequestDefinition, MentorModel };
