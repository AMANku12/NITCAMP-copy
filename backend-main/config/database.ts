import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.HOST_NAME!,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    dialectOptions: {
      useUTC: true,
    },
    define: {
      // We use the freezeTableName model option to enforce tables
      // to take the same name as the ones indicated here
      // (sequelize has a tendency of auto-pluralization of names).
      freezeTableName: true,
    },
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection successful.");
  } catch (err) {
    console.error("Unable to connect to db.");
  }
};

export { sequelize, testConnection };
