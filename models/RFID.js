import mongoose from "mongoose";

const Rfid = mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Rfid", Rfid);
