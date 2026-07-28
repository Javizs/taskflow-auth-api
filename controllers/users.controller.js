import { getAllUsers } from "../services/users.service.js";

export async function getUsers(req, res, next) {
    try {
        const users = await getAllUsers();

        res.json({
            success: true,
            data: users
        });

    } catch (error) {
        next(error);
    }
}