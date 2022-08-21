import Rfid from "../models/RFID.js";

export class RFIDController {
    static getRFID = async (req, res) => {
        try {
            const rfid = await Rfid.find();
            res.json(rfid);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static saveRFID = async (req, res) => {
        const rfid = new Rfid(req.body);
        try {
            const savedRFID = await rfid.save();
            res.status(201).json(savedRFID);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}
