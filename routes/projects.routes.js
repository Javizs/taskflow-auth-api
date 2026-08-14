import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    createProject,
    getProjects,
    getProjectById
} from "../controllers/projects.controllers.js";
import { createTask,getTasks } from "../controllers/tasks.controller.js";
const router = express.Router();

router.post("/", authMiddleware, createProject);
router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/:projectId/tasks", authMiddleware, createTask);
router.get("/:projectId/tasks", authMiddleware, getTasks);
export default router;