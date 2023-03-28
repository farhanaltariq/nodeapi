import express from "express";
const router = express.Router();
import { Auth } from "../middleware/auth.js";

import RFIDRoutes from "./RFIDRoutes.js";
import DefaultRoutes from "./DefaultRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import LockRoutes from "./LockRoutes.js";
import PIRRoutes from "./PIRRoutes.js";

router.use("/auth", AuthRoutes);
// router.use(Auth.authenticateToken);
router.use("/rfid", RFIDRoutes);
router.use("/lock", LockRoutes);
router.use("/pir", PIRRoutes);
router.use(DefaultRoutes);

export default router;
