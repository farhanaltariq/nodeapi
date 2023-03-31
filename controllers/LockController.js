import Lock from "../models/Lock.js";

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
            const lock = new Lock({
                status: req.body.status,
                timestamp: new Date(),
            });
            await lock.save();
        } catch (error) {
            return error;
        }
    };

    static keyActivity = async (req, res) => {
        return res.render("Lock");
    };
}
