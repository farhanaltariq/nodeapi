import PIR from "../models/PIR.js";
global.PIRStatus = false;
export class PIRController {
    static getPIR = async (req, res) => {
        try {
            const pir = await PIR.find().sort({ timestamp: -1 }).exec();
            return res.render("Motions", {
                pir,
                username: req.cookies.username,
                battery: global.BatteryLevel,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static insertData = async (req, res) => {
        try {
            if (global.PIRStatus == false)
                return res.status(403).json({
                    message: "Sensor is disabled",
                    pir: global.PIRStatus,
                });
            // Mengambil data dari body dan file upload
            const image = req.file;

            // Memasukkan data ke database
            await new PIR({
                image: {
                    data: image.buffer,
                    contentType: image.mimetype,
                    filename: image.originalname,
                },
                timestamp: new Date(),
            }).save();

            // Mengembalikan response berhasil
            return res.status(201).json({
                message: "Data successfully saved",
                pir: global.PIRStatus,
            });
        } catch (error) {
            // Mengembalikan response error
            console.error(error);
            return res.status(500).json({
                message: "Internal server error",
                error: error.message,
            });
        }
    };

    static changeStatus = async (req, res) => {
        try {
            PIRStatus = !PIRStatus;
            return res.redirect("/dashboard");
        } catch (error) {
            return error;
        }
    };
}
