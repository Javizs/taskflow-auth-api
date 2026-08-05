import { registerUser } from "../services/auth.service.js";

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