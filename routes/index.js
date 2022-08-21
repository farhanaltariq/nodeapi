import express from "express";

import { RFIDController } from "../controllers/RFIDController.js";

const router = express.Router();
router.get("/", RFIDController.getRFID);
router.post("/", RFIDController.saveRFID);

export default router;
