import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import { User } from "./user";
import { MentorModel } from "../types/mentor";

const Mentor = sequelize.define<MentorModel>("mentor", {
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

  maxMentees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  mentoringType: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

Mentor.belongsTo(User, { foreignKey: "userId" });

export { Mentor };
