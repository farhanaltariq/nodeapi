import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import { MongooseConnection } from "./config/database.js";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

MongooseConnection.connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(routes);

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));

export default app;
