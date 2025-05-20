// imports
import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import expressJSDocSwagger from "express-jsdoc-swagger";
import { sequelize, testConnection } from "./config/database";
import { menteeRouter } from "./routes/mentee";
import { mentorRouter } from "./routes/mentor";
import { adminRouter } from "./routes/admin";

const app = express();
const port = process.env.PORT;

// configurations
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(bodyParser.json());

// setting up the swagger page configurations
expressJSDocSwagger(app)({
  info: {
    version: "1.0.0",
    title: "NITCAMP",
  },

  // Base directory which we use to locate your JSDOC files
  baseDir: ".",
  // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
  filesPattern: ["./types/*.ts", "./controllers/*.ts"],
  // URL where SwaggerUI will be rendered
  swaggerUIPath: "/api-docs",
  // Expose OpenAPI UI
  exposeSwaggerUI: true,
  // Set non-required fields as nullable by default
  notRequiredAsNullable: false,
});

// routes
app.use("/api/mentor", mentorRouter);
app.use("/api/mentee", menteeRouter);
app.use("/api/admin", adminRouter);

app.use((err: any, req: Request, res: Response, _: any) => {
  console.error(err);
  res.status(500).send("Internal Server Error");
});

// connecting to the database
testConnection();

// syncing multiple models together instead of individually
sequelize
  .sync({ force: false })
  .then((_) => {
    console.log("DB sync was successful!");
  })
  .catch((err) => {
    console.log(err);
  });

// server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
