import mongoose from "mongoose";

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
        default: () => moment.tz(Date.now(), timezone),
    },
});

export default mongoose.model("Rfid", Rfid);
