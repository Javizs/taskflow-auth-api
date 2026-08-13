import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError.js";

export function authMiddleware(req, res, next) {
    try {
       const authorization = req.headers.authorization;

      if (!authorization) {
    throw new AppError("Token requerido", 401);
}
        const parts = authorization.split(" ");
const scheme = parts[0];
const token = parts[1];

if (parts.length !== 2 || scheme !== "Bearer" || !token) {
    throw new AppError("Formato de token inválido", 401);
}

        if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está configurado");
}

const payload = jwt.verify(
    token,
    process.env.JWT_SECRET
);

if (!payload.sub) {
    throw new AppError("Token inválido", 401);
}

        // 7. Guardar:
        req.user = {
            id: payload.sub,
            role: payload.role
        };

        // 8. Continuar:
        next();
       } catch (error) {
        if (error instanceof AppError) {
            return next(error);
        }

        if (
            error.name === "JsonWebTokenError" ||
            error.name === "TokenExpiredError" ||
            error.name === "NotBeforeError"
        ) {
            return next(
                new AppError("Token inválido o expirado", 401)
            );
        }

        return next(error);
    }
}