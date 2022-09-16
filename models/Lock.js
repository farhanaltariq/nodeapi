import mongoose from "mongoose";

const Lock = new mongoose.Schema({
    status: {
        type: Boolean,
        required: true,
    },
    timestamp: {
        type: Date,
        required: true,
    },
});

export default mongoose.model("Lock", Lock);
