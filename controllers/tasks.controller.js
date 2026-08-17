import {
    createProjectTask,
    getProjectTasks,
    getTasksByFilters
} from "../services/tasks.service.js";

export async function createTask(req, res, next) {
    try {
        const projectId = Number(req.params.projectId);
        const userId = Number(req.user.id);

        const task = await createProjectTask(
            req.body,
            projectId,
            userId
        );

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        next(error);
    }
}

export async function getTasks(req, res, next) {
    try {
        const projectId = Number(req.params.projectId);
        const userId = Number(req.user.id);

        const project = await getProjectTasks(projectId, userId);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
}

export async function getAllTasks(req, res, next) {
    try {
        const filters = {
            status: req.query.status,
            priority: req.query.priority,
            limit: req.query.limit,
            offset: req.query.offset
        };

        const tasks = await getTasksByFilters(
            filters,
            Number(req.user.id)
        );

        res.status(200).json({
            success: true,
            data: tasks
        });
    } catch (error) {
        next(error);
    }
}
