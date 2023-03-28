import express from "express";
import { PIRController } from "../controllers/PIRController.js";
const router = express.Router();

router.get("/", PIRController.getPIR);
router.get("/status", PIRController.getStatus);

export default router;
