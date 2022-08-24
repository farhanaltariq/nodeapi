import express from "express";
import { DefaultController } from "../controllers/DefaultController.js";
const router = express.Router();

router.get("*", DefaultController.notFound);

export default router;
