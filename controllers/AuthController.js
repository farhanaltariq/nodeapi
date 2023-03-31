import jsonwebtoken from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export class AuthController {
    static login = async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.body.username,
            });

            if (user) {
                const checkPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                const data = {
                    id: user._id,
                    username: user.username,
                    password: user.password,
                };

                if (checkPassword) {
                    const accessToken = jsonwebtoken.sign(
                        data,
                        process.env.ACCESS_TOKEN_SECRET
                    );

                    data.accessToken = accessToken;

                    return res.json({ data });
                }
            }

            return res.status(401).json({ message: "Invalid credentials" });
        } catch (err) {
            return res.json(err.message);
        }
    };

    static register = async (req, res) => {
        try {
            const user = new User({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 12),
            });
            const savedUser = await user.save();
            res.status(201).json(savedUser);
        } catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    };

    static loginForm = async (req, res) => {
        return res.render("login");
    };
    static profile = async (req, res) => {
        return res.render("Profile");
    };
}
