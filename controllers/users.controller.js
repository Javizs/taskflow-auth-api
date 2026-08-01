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

       

        const user = await getUserByIdService(id);

 

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
}
