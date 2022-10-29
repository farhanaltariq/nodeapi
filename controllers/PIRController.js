import PIR from "../models/PIR";
import PIR from "../models/PIR";

export class PIRController {
    static getAll = async (req, res) => {
        try {
            const pir = await PIR.find();
            res.json(pir);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static insertData = async (req, res) => {
        try {
            const PIR = new PIR({
                status: req.body.status,
                timestamp: new Date(),
            });
        } catch (error) {
            return error;
        }
    };
}
