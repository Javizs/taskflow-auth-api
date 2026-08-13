import { AppError } from "../utils/AppError.js";


export function authorizeRole(requiredRole) {
    return function (req, res, next) {
        if (req.user.role !== requiredRole) {
            throw new AppError("No tienes permisos", 403);
        }

        next();
    };
}