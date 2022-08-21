import mongoose from "mongoose";

export default function mongooseConnectDB() {
    mongoose
        .connect("mongodb://localhost:27017/rfid", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((err) => console.log(`Fail to connect, ${err}`));
}
