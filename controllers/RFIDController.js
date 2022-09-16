import Rfid from "../models/RFID.js";
import { LockController } from "./LockController.js";

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
                req.body.status = true;
                LockController.createStatus(req, res);
                res.status(200).json({
                    message: "RFID is valid, key unlocked for 7 seconds",
                });

                // delay 5s
                setTimeout(() => {
                    req.body.status = false;
                    LockController.createStatus(req, res);
                }, 7000);

                return;
            }

            req.body.status = false;
            LockController.createStatus(req, res);
            return res.status(400).json({ message: "RFID is invalid" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}
