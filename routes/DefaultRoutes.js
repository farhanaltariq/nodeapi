import express from "express";
import { DefaultController } from "../controllers/DefaultController.js";
const router = express.Router();
// redirect to login
router.get("/", DefaultController.redirectToLogin);
router.get("/dashboard", DefaultController.dashboard);
router.all("*", DefaultController.notFound);

export default router;
