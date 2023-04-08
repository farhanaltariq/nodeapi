import PIR from "../models/PIR.js";

export class PIRController {
    static getPIR = async (req, res) => {
        try {
            const pir = await PIR.find();
            return res.render("Motions", {
                pir,
                username: req.cookies.username,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static insertData = async (req, res) => {
        try {
            new PIR({
                status: req.body.status,
                timestamp: new Date(),
            });
        } catch (error) {
            return error;
        }
    };

    static getStatus = async (req, res) => {
        try {
            return res.json("status");
        } catch (error) {
            return error;
        }
    };
}
