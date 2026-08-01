import { AppError } from "../utils/AppError.js"
export function notFoundHandler(req,res,next){
    next(
        new AppError(
            `Ruta ${req.method} ${req.originalUrl} no encontrada`, 404
        )
    )
}