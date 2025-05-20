import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

interface AdminModel
  extends Model<
    InferAttributes<AdminModel>,
    InferCreationAttributes<AdminModel>
  > {
  id: CreationOptional<number>;
  name: string;
  email: string;
  phone: string;
}

const Admin = sequelize.define<AdminModel>("admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING(100), // accounting for long names
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100), // accounting for long emails
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
});

export { Admin };
