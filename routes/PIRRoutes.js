import express from "express";
import { PIRController } from "../controllers/PIRController.js";
const router = express.Router();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", PIRController.getPIR);
router.get("/status", PIRController.getStatus);
router.post("/", upload.single("image"), PIRController.insertData);

export default router;
