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
        try {
            const isexist = await Rfid.findOne({ id: req.body.id }).exec();
            if (!isexist) {
                const rfid = new Rfid(req.body);
                const savedRFID = await rfid.save();
                return res.status(201).json(savedRFID);
            }

            return res.status(400).json({ message: "RFID already exist" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static validateRFID = async (req, res) => {
        try {
            const rfid = await Rfid.find({ id: req.body.id }).exec();
            if (rfid.length > 0) {
                return res.status(200).json({ message: "RFID is valid" });
            }

            return res.status(400).json({ message: "RFID is invalid" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}
