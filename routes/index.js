import express from "express";
const router = express.Router();
import { Auth } from "../middleware/auth.js";

import RFIDRoutes from "./RFIDRoutes.js";
import DefaultRoutes from "./DefaultRoutes.js";
import AuthRoutes from "./AuthRoutes.js";
import LockRoutes from "./LockRoutes.js";

router.use(Auth.authenticateToken);
router.use("/auth", AuthRoutes);
router.use("/rfid", RFIDRoutes);
router.use("/lock", LockRoutes);
router.use(DefaultRoutes);

export default router;
