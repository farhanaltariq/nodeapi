import express from "express";
import { AuthController } from "../controllers/AuthController.js";
const router = express.Router();

router.post("/", AuthController.login);
router.post("/register", AuthController.register);
router.get("/", AuthController.test);

export default router;
