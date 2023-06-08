import Lock from "../models/Lock.js";
import PIR from "../models/PIR.js";
import Rfid from "../models/RFID.js";
global.BatteryLevel = "";
export class DefaultController {
    static notFound = async (req, res) => {
        return res.status(404).json({ message: `${req.path} Not Found` });
    };
    static redirectToLogin = async (req, res) => {
        return res.redirect("/auth");
    };
    static dashboard = async (req, res) => {
        var countKey = await Lock.countDocuments();
        var countPIR = await PIR.countDocuments();
        var countRFID = await Rfid.countDocuments();

        return res.render("Dashboard", {
            username: req.cookies.username,
            pirStatus: global.PIRStatus,
            countKey,
            countPIR,
            countRFID,
            battery: global.BatteryLevel,
        });
    };
    static UpdateBattery = async (req, res) => {
        global.BatteryLevel = req.body.battery;
        return res.status(200).json({ message: "success" });
    };
}
