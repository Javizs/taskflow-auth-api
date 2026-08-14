import { AppError } from "../utils/AppError.js";
import { findProjectById } from "../repositories/projects.repository.js";
import { insertTask } from "../repositories/tasks.repository.js";

export async function createProjectTask(data, projectId, userId) {
    if (!Number.isInteger(projectId) || projectId <= 0) {
        throw new AppError("ID de proyecto no válido", 400);
    }

    if (!data || typeof data.title !== "string" || !data.title.trim()) {
        throw new AppError("El título es obligatorio", 400);
    }

    const project = await findProjectById(projectId);

    if (!project) {
        throw new AppError("Proyecto no encontrado", 404);
    }

    if (project.user_id !== userId) {
        throw new AppError("No tienes permiso", 403);
    }

    const title = data.title.trim();
    const id = await insertTask(title, projectId);

    return { id, title, projectId };
}
import { findProjectWithTasks } from "../repositories/tasks.repository.js";

export async function getProjectTasks(projectId, userId) {
    if (!Number.isInteger(projectId) || projectId <= 0) {
        throw new AppError("ID de proyecto no válido", 400);
    }

    const rows = await findProjectWithTasks(projectId);

    if (rows.length === 0) {
        throw new AppError("Proyecto no encontrado", 404);
    }

    if (rows[0].user_id !== userId) {
        throw new AppError("No tienes permiso", 403);
    }

    return {
        id: rows[0].project_id,
        name: rows[0].project_name,
        tasks: rows
            .filter(row => row.task_id !== null)
            .map(row => ({
                id: row.task_id,
                title: row.task_title
            }))
    };
}