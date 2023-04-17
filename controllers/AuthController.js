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

                    res.cookie("accessToken", accessToken, {
                        httpOnly: true,
                    });
                    res.cookie("username", user.username, { httpOnly: true });
                    res.cookie("id", user._id, { httpOnly: true });

                    if (req.headers["user-agent"].includes("Chrome")) {
                        return res.redirect("/dashboard");
                    }
                    return res.json({ data });
                }
            }

            req.flash("msg", "Invalid username or password");
            res.locals.messages = req.flash();

            if (req.headers["user-agent"].includes("Chrome")) {
                return res.render("Login");
            }
            return res.json({ message: "Invalid username or password" });
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

    static updateProfile = async (req, res) => {
        try {
            // all field must be filled
            if (
                !req.body.username ||
                !req.body.password ||
                !req.body.newPassword ||
                !req.body.confirmNewPassowrd
            ) {
                req.flash("msg", "All field must be filled");
                req.flash("status", "warning");
                res.locals.messages = req.flash();
                return res.render("Profile", {
                    username: req.cookies.username,
                });
            }

            let matcNewPassword =
                req.body.newPassword == req.body.confirmNewPassowrd;
            if (!matcNewPassword) {
                req.flash("msg", "Confirmation password does not match");
                req.flash("status", "danger");
                res.locals.messages = req.flash();
                return res.render("Profile", {
                    username: req.cookies.username,
                });
            }
            var user = await User.findById(req.cookies.id);
            console.log(user);
            if (user) {
                // if username is duplicate
                if (req.body.username !== req.cookies.username) {
                    const existingUser = await User.findOne({
                        // not own id
                        _id: { $ne: req.cookies.id },
                        username: req.body.username,
                    });
                    if (existingUser) {
                        req.flash("msg", "Username already exists");
                        req.flash("status", "danger");
                        res.locals.messages = req.flash();
                        return res.render("Profile", {
                            username: req.cookies.username,
                        });
                    }
                }

                // validate old password
                const checkPassword = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (checkPassword) {
                    // update password
                    user.password = bcrypt.hashSync(req.body.newPassword, 12);
                    user.username = req.body.username;
                    await user.save();
                    req.flash("msg", "Profile updated");
                    req.flash("status", "success");
                    res.locals.messages = req.flash();
                    return res.render("Profile", {
                        username: req.cookies.username,
                    });
                } else {
                    req.flash("msg", "Invalid password");
                    req.flash("status", "danger");
                    res.locals.messages = req.flash();
                    return res.render("Profile", {
                        username: req.cookies.username,
                    });
                }
            }
        } catch (err) {
            req.flash("msg", err.message);
            req.flash("status", "danger");
            res.locals.messages = req.flash();
            return res.render("Profile", {
                username: req.cookies.username,
            });
        }
    };

    static loginForm = async (req, res) => {
        return res.render("login");
    };
    static profile = async (req, res) => {
        return res.render("Profile", { username: req.cookies.username });
    };
    static logout = async (req, res) => {
        res.clearCookie("accessToken");
        return res.redirect("/auth");
    };
}
