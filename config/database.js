import mongoose from "mongoose";
import dotenv from "dotenv";
import moment from "moment-timezone";

const timezone = "Asia/Jakarta";
dotenv.config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
export class MongooseConnection {
    static connectDB = async (req, res) => {
        mongoose
            .connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log("Connected to database");
            })
            .catch((err) => console.log(`Fail to connect, ${err}`));
    };
}
