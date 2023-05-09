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
            return res.status(201).json({ message: "Data successfully saved" });
        } catch (error) {
            // Mengembalikan response error
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
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
