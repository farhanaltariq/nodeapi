export class DefaultController {
    static notFound = async (req, res) => {
        return res
            .status(404)
            .json({ message: `Mau akses ${req.path} ? , Gaboleh coy` });
    };
}
