import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import { User } from "./user";
import { MenteeModel } from "../types/mentee";

const Mentee = sequelize.define<MenteeModel>("mentee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },

  rollNo: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },

  yearofStudy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Mentee.belongsTo(User, { foreignKey: "userId" });

export { Mentee };
