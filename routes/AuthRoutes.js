import express from "express";
import { AuthController } from "../controllers/AuthController.js";
import { Auth } from "../middleware/auth.js";
const router = express.Router();

router.post("/", AuthController.login);
router.post("/register", AuthController.register);
router.use(Auth.authenticateToken);
router.get("/", AuthController.test);

export default router;
