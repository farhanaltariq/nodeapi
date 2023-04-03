import express from "express";
const router = express.Router();

import { RFIDController } from "../controllers/RFIDController.js";

router.get("/", RFIDController.getRFID);
router.post("/", RFIDController.newRFID);
router.get("/delete/:id", RFIDController.deleteRFID);
router.post("/validate", RFIDController.validateRFID);

export default router;
