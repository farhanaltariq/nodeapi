import mongoose from "mongoose";
import moment from "moment-timezone";
const timezone = "Asia/Jakarta";

const Rfid = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone).toDate(),
    },
});

export default mongoose.model("Rfid", Rfid);
