import mongoose from "mongoose";

const PIR = new mongoose.Schema(
    {
        id: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("PIR", PIR);
