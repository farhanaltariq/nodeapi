import mongoose from "mongoose";
import moment from "moment-timezone";

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone).toDate(),
    },
});

export default mongoose.model("User", User);
