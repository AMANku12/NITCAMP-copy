import { UserModel } from "./user";

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

/**
 * DTO for mentee details.
 * @typedef {object} MenteeModel
 * @property {number} id
 * @property {number} userId
 * @property {number} rollNo
 * @property {number} yearOfStudy
 * @property {UserModel} UserInfo
 */
interface MenteeModel
  extends Model<
    InferAttributes<MenteeModel>,
    InferCreationAttributes<MenteeModel>
  > {
  id: CreationOptional<number>;
  userId: number;
  rollNo: string;
  yearofStudy: number;
  userInfo?: UserModel;
}

/**
 * DTO for registering mentee details.
 * @typedef {object} MenteeRequestDefinition
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} dept
 * @property {number} yearOfEnrollment
 * @property {string[]} broadAreas
 * @property {string[]} narrowAreas
 * @property {string} rollNo
 * @property {number} yearOfStudy
 */
type MenteeRequestDefinition = {
  name: string | null;
  phone: string | null;
  email: string | null;
  dept: string | null;
  yearOfEnrollment: number | null;
  broad_areas: string[] | null;
  narrow_areas: string[] | null;
  rollNo: string | null;
  yearOfStudy: number | null;
};

export { MenteeRequestDefinition, MenteeModel };
