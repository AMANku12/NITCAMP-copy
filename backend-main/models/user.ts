import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import { UserModel } from "../types/user";

// We avoid calling this table user to avoid conflicts with Postgres's in-built iser table.
const User = sequelize.define<UserModel>("nitcamp_user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },

  dept: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  yearOfEnrollment: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  availability: {
    type: DataTypes.BOOLEAN,
  },

  broadAreas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },

  narrowAreas: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
});

export { User };
