import express, {Request, Response} from "express";
import cors from "cors";
import gAuthRouter from "./routes/gauth.route"

const app = express();
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use("/api/auth", gAuthRouter)

// Start server
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
