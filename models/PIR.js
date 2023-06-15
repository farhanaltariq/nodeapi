import mongoose from "mongoose";
import moment from "moment-timezone";

const PIR = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
        filename: String,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone).toDate(),
    },
});

export default mongoose.model("PIR", PIR);
