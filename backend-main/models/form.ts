import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";

import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";

interface FormModel
  extends Model<
    InferAttributes<FormModel>,
    InferCreationAttributes<FormModel>
  > {
  id: CreationOptional<number>;
  formOpenDatetime: Date;
  formCloseDatetime: Date;
  type: String;
}

const Form = sequelize.define<FormModel>("form", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  formOpenDatetime: {
    type: DataTypes.DATE,
  },

  formCloseDatetime: {
    type: DataTypes.DATE,
  },
  type: {
    type: DataTypes.STRING(20),
  },
});

export { Form };
