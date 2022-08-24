import express from "express";
import cors from "cors";
import route from "./routes/index.js";
import dotenv from "dotenv";
import { MongooseConnection } from "./config/database.js";

const app = express();
dotenv.config();

MongooseConnection.connectDB();

app.use(cors());
app.use(express.json());
app.use(route);

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));
