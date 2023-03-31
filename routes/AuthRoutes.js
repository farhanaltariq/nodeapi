import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { Auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", AuthController.loginForm);
router.get("/profile", AuthController.profile);
router.post("/", AuthController.login);
router.post("/register", AuthController.register);
router.use(Auth.authenticateToken);

export default router;
