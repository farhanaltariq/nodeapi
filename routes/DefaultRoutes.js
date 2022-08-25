import express from "express";
import { DefaultController } from "../controllers/DefaultController.js";
const router = express.Router();

router.all("*", DefaultController.notFound);

export default router;
