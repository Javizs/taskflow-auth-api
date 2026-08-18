import { AppError } from "../utils/AppError.js";
import { findProjectById } from "../repositories/projects.repository.js";
import {
    insertTask,
    findProjectWithTasks,
    findTasks
} from "../repositories/tasks.repository.js";

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

function normalizeFilter(value, name) {
    if (value === undefined) return undefined;

    if (typeof value !== "string" || !value.trim()) {
        throw new AppError(`${name} no válido`, 400);
    }

    return value.trim().toLowerCase();
}

function normalizeInteger(value, name, defaultValue, minimum, maximum) {
    if (value === undefined) return defaultValue;

    if (typeof value !== "string" || !/^\d+$/.test(value)) {
        throw new AppError(`${name} no válido`, 400);
    }

    const number = Number(value);

    if (number < minimum || number > maximum) {
        throw new AppError(`${name} no válido`, 400);
    }

    return number;
}

export async function getTasksByFilters(filters, userId) {
    const allowedStatus = ["pending", "in_progress", "completed"];
    const allowedPriorities = ["low", "medium", "high"];

    const status = normalizeFilter(filters.status, "Status");
    const priority = normalizeFilter(filters.priority, "Priority");
    const limit = normalizeInteger(filters.limit, "Limit", 50, 1, 100);
    const offset = normalizeInteger(
        filters.offset,
        "Offset",
        0,
        0,
        Number.MAX_SAFE_INTEGER
    );

    if (status && !allowedStatus.includes(status)) {
        throw new AppError("Status no válido", 400);
    }

    if (priority && !allowedPriorities.includes(priority)) {
        throw new AppError("Priority no válida", 400);
    }

    return findTasks({ status, priority, limit, offset }, userId);
}
