import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getAllTasks } from "../controllers/tasks.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllTasks);

export default router;