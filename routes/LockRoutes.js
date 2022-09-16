import express from "express";
import { LockController } from "../controllers/LockController.js";
const router = express.Router();

router.get("/", LockController.getStatus);

export default router;
