import express from "express";
const router = express.Router();

import RFIDRoutes from "./RFIDRoutes.js";
import DefaultRoutes from "./DefaultRoutes.js";

router.use("/rfid", RFIDRoutes);
router.use(DefaultRoutes);

export default router;
