import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class Auth {
    static authenticateToken = async (req, res, next) => {
        try {
            const authHeader = req.headers["authorization"];
            const token = authHeader && authHeader.split(" ")[1];
            if (token == null && req.cookies.accessToken == null) {
                // if request from browser
                if (req.headers["user-agent"].includes("Chrome")) {
                    return res.redirect("/auth");
                }

                return res.status(401).json({
                    message: "unauthorized",
                });
            }

            if (token != null) {
                jsonwebtoken.verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET,
                    (err, user) => {
                        if (err) return res.sendStatus(403);
                        req.user = user;
                        next();
                    }
                );
            } else {
                next();
            }
        } catch (err) {
            return res.status(500).json({
                message: err.message,
            });
        }
    };
}
