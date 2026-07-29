import {
    getAllUsers,
    getUserByIdService
} from "../services/users.service.js";

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

export async function getUserById(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                success: false,
                error: "Invalid ID"
            });
        }

        const user = await getUserByIdService(id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User not found"
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}
