import mongoose from "mongoose";

const Lock = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
    },
    timestamp: {
        type: Date,
        default: () => moment.tz(Date.now(), timezone),
    },
});

export default mongoose.model("Lock", Lock);
