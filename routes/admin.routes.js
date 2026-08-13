import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/authorizeRole.middleware.js";
import { getUsers } from "../controllers/users.controller.js";

const router = express.Router();

router.get(
    "/users",
       authMiddleware,
    authorizeRole("ADMIN"),
    getUsers
);

export default router;