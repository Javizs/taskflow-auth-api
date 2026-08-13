import {
    createUserProject,
    getUserProjects,
    getUserProjectById
} from "../services/projects.service.js";
export async function createProject(req, res, next) {
    try {
        const userId = Number(req.user.id);

        const project = await createUserProject(
            req.body,
            userId
        );

        res.status(201).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
}
export async function getProjects(req, res, next) {
    try {
        const userId = Number(req.user.id);

        const projects = await getUserProjects(userId);

        res.status(200).json({
            success: true,
            data: projects
        });
    } catch (error) {
        next(error);
    }
}
export async function getProjectById(req, res, next) {
    try {
        const projectId = Number(req.params.id);
        const userId = Number(req.user.id);

        const project = await getUserProjectById(projectId, userId);

        res.status(200).json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
}