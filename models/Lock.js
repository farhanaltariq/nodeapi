import mongoose from "mongoose";
import moment from "moment-timezone";
const timezone = "Asia/Jakarta";

const Lock = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone).toDate(),
    },
});

export default mongoose.model("Lock", Lock);
