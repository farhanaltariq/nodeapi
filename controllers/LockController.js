import Lock from "../models/Lock.js";
import RFID from "../models/RFID.js";

export class LockController {
    static getStatus = async (req, res) => {
        try {
            const lock = await Lock.find({})
                .select("status")
                .sort({ _id: -1 })
                .limit(1);
            res.json(lock);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    static createStatus = async (req, res) => {
        try {
            const id = req.body.id;
            const name = await RFID.findOne({ id: id }).exec();
            const details = name.name + " | " + id;
            const lock = new Lock({
                status: req.body.status,
                details: details,
            });
            await lock.save();
        } catch (error) {
            return error;
        }
    };

    static keyActivity = async (req, res) => {
        try {
            const lock = await Lock.find().sort({ timestamp: -1 }).exec();
            return res.render("Locks", {
                lock,
                username: req.cookies.username,
                battery: global.BatteryLevel,
                pirStatus: global.PIRStatus,
            });
        } catch (error) {
            return error;
        }
    };
}
