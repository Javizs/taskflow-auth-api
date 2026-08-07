import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    createProject,
    getProjects
} from "../controllers/projects.controllers.js";
const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);

export default router;