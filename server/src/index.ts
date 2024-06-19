import * as cors from "cors";
import * as express from "express";
import mongoose from "mongoose";
import * as path from "path";
require("dotenv").config();
import { Config } from "./app/config";
import { router } from "./routers";

const PORT = parseInt((process.env.PORT || "4420") as string, 10);
const app = express();
const MONGODB_URI = Config.mongoDB_URL;

console.log("MONGODB_URI:", MONGODB_URI);
console.log("PORT:", PORT);

const allowedOrigins = ["http://localhost:5173", "http://127.0.0.1:5173","https://tech-shop-sowinski.netlify.app"];
app.use(cors({
  credentials: true,
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin ?? "") || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

app.use(express.static(path.join(__dirname, "../../../web/dist")));
app.get("*", (req: express.Request, res: express.Response) =>
  res.sendFile(path.join(__dirname, "../../../web/dist/index.html"))
);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send({ message: err.message });
    next();
  }
);

const start = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined');
    }
    await mongoose.connect(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

start();
