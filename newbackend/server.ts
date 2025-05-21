import express, {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouter from "./routes/auth.route";
// import menteeRouter from "./routes/mentee.route";
// import mentorRouter from "./routes/mentor.route";
// import adminRouter from "./routes/admin.route";
import pool from "./db/db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request,res: Response)=>{
    res.send("<h1>SERVER IS RUNNING</h1>");
});

//routes
app.use("/api/login", AuthRouter);
// app.use("/api/mentee-reg", menteeRouter);
// app.use("/api/mentor-reg", mentorRouter);
// app.use("/api/admin-reg", adminRouter);

app.listen(3001, ()=>{
    console.log("🆗 server is running on port",3001);
    pool.query("SELECT NOW()", (err, res) => {
        if (err) {
            console.error("❌ DB connection failed:", err.message);
        } else {
            console.log("✅ DB connected at:", res.rows[0].now);
        }
    });
});
