import Rfid from "../models/RFID.js";
import { LockController } from "./LockController.js";

global.isRegisterMode = false;
global.newName = "";
export class RFIDController {
    static newRFID = async (req, res) => {
        try {
            const rfid = await Rfid.find();
            global.isRegisterMode = !isRegisterMode;
            global.newName = req.body.name;
            // go back to page with message
            req.flash("msg", "Please scan your RFID");
            req.flash("status", "success");
            res.locals.messages = req.flash();
            return res.render("RFIDs", {
                rfid,
                username: req.cookies.username,
                battery: global.BatteryLevel,
                pirStatus: global.PIRStatus,
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static getRFID = async (req, res) => {
        try {
            const rfid = await Rfid.find();
            return res.render("RFIDs", {
                rfid,
                username: req.cookies.username,
                battery: global.BatteryLevel,
                pirStatus: global.PIRStatus,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static saveRFID = async (req, res) => {
        try {
            const isexist = await Rfid.findOne({ id: req.body.id }).exec();
            if (!isexist) {
                let date = new Date();
                const rfid = new Rfid({
                    id: req.body.id,
                    timestamp: date,
                    name: global.newName,
                });
                const savedRFID = await rfid.save();
                return res.status(201).json(savedRFID);
            }

            return res.status(400).json({ message: "RFID already exist" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };

    static deleteRFID = async (req, res) => {
        try {
            const delRFID = await Rfid.findByIdAndDelete(req.params.id);
            if (!delRFID) {
                req.flash("msg", "RFID not found");
                req.flash("status", "danger");
            } else {
                req.flash("msg", "RFID Deleted");
                req.flash("status", "success");
            }
            res.locals.messages = req.flash();
            const rfid = await Rfid.find();
            return res.render("RFIDs", {
                rfid,
                username: req.cookies.username,
                battery: global.BatteryLevel,
                pirStatus: global.PIRStatus,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static validateRFID = async (req, res) => {
        try {
            if (global.isRegisterMode) {
                global.isRegisterMode = !isRegisterMode;
                return this.saveRFID(req, res);
            }

            const rfid = await Rfid.find({ id: req.body.id }).exec();
            if (rfid.length > 0) {
                req.body.status = true;
                LockController.createStatus(req, res);
                global.PIRStatus = false;
                return res.status(200).json({
                    message:
                        "RFID is valid, key unlocked for 7 seconds. PIR is disabled",
                });
            }

            req.body.status = false;
            LockController.createStatus(req, res);
            return res.status(400).json({ message: "RFID is invalid" });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    };
}
