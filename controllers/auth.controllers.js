import {
    registerUser,
    loginUser
} from "../services/auth.service.js";
import { getUserByIdService } from "../services/users.service.js";
export async function register(req, res, next) {
    try {
        const { name, email, password } = req.body;

        const user = await registerUser({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const result = await loginUser({
            email,
            password
        });

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        next(error);
    }
}
export async function me(req, res, next) {
    try {
        const user = await getUserByIdService(
            Number(req.user.id)
        );

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}