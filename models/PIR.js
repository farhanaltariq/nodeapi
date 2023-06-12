import mongoose from "mongoose";

const PIR = new mongoose.Schema({
    image: {
        data: Buffer,
        contentType: String,
        filename: String,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone),
    },
});

export default mongoose.model("PIR", PIR);
