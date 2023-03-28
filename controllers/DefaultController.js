export class DefaultController {
    static notFound = async (req, res) => {
        return res.status(404).json({ message: `${req.path} Not Found` });
    };
    static redirectToLogin = async (req, res) => {
        return res.redirect("/auth");
    };
    static dashboard = async (req, res) => {
        return res.render("dashboard");
    };
}
