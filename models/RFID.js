import mongoose from "mongoose";

const Rfid = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Rfid", Rfid);
