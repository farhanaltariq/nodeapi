import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import { MongooseConnection } from "./config/database.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

MongooseConnection.connectDB();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(cookieParser("NotSoSecret"));
app.use(
    session({
        secret: "something",
        cookie: { maxAge: 60000 },
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());
app.use(routes);

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running at http://${host}:${port}`));

export default app;
