import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import { Mentor } from "./mentor";
import { Mentee } from "./mentee";
import { Model, InferAttributes, InferCreationAttributes } from "sequelize";

interface MentorMenteeMatchModel
  extends Model<
    InferAttributes<MentorMenteeMatchModel>,
    InferCreationAttributes<MentorMenteeMatchModel>
  > {
  mentorID: number;
  menteeID: number;
}

const MentorMenteeMatch = sequelize.define<MentorMenteeMatchModel>(
  "mentorMenteeMatch",
  {
    mentorID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "id",
      },
    },

    menteeID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentee,
        key: "id",
      },
    },
  }
);

Mentor.hasMany(MentorMenteeMatch, { foreignKey: "mentorID" });
Mentee.hasMany(MentorMenteeMatch, { foreignKey: "menteeID" });

export { MentorMenteeMatch };
