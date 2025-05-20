import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

/**
 * DTO for user details.
 * @typedef {object} UserModel
 * @property {number} id
 * @property {string} name
 * @property {string} phone
 * @property {string} email
 * @property {string} dept
 * @property {number} yearOfEnrollment
 * @property {boolean} availability
 * @property {string[]} broadAreas
 * @property {string[]} narrowAreas
 */
interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  name: string;
  phone: string;
  email: string;
  dept: string;
  yearOfEnrollment: number;
  availability: boolean;
  broadAreas: string[];
  narrowAreas: string[];
}

export { UserModel };
