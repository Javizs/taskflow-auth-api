import { AppError } from "../utils/AppError.js";
import {
    createProject,
    findProjectsByUserId
} from "../repositories/projects.repository.js";

export async function createUserProject(data, userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        throw new AppError("Usuario no válido", 401);
    }

    if (!data || typeof data !== "object") {
        throw new AppError("Datos del proyecto requeridos", 400);
    }

    const { name, description } = data;

    if (typeof name !== "string" || name.trim() === "") {
        throw new AppError("El nombre es obligatorio", 400);
    }

    if (
        description !== undefined &&
        description !== null &&
        typeof description !== "string"
    ) {
        throw new AppError("La descripción debe ser texto", 400);
    }

    const normalizedName = name.trim();
    const normalizedDescription =
        typeof description === "string" && description.trim() !== ""
            ? description.trim()
            : null;

    const projectId = await createProject(
        normalizedName,
        normalizedDescription,
        userId
    );

    return {
        id: projectId,
        name: normalizedName,
        description: normalizedDescription,
        userId
    };
}

export async function getUserProjects(userId) {
    if (!Number.isInteger(userId) || userId <= 0) {
        throw new AppError("Usuario no válido", 401);
    }

    const projects = await findProjectsByUserId(userId);

    return projects.map(
        ({ id, name, description, user_id, created_at }) => ({
            id,
            name,
            description,
            userId: user_id,
            createdAt: created_at ?? null
        })
    );
}
