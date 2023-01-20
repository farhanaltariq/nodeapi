import PIR from "../models/PIR.js";

export class PIRController {
    static getAll = async (req, res) => {
        try {
            const data = await PIR.find();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static insertData = async (req, res) => {
        try {
            const data = new PIR({
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
