import { findAllUsers, findUserById } from "../repositories/users.repository.js";
import { AppError } from "../utils/AppError.js";

export async function getAllUsers() {
    const users = await findAllUsers();

    return users.map(({ id, name, email, created_at }) => ({
        id,
        name,
        email,
        createdAt: created_at ?? null
    }));
}
export async function getUserByIdService(id) {
     if (!Number.isInteger(id) || id <= 0){
        throw new AppError("ID debe ser mayor que 0", 400)
    }
    const user = await findUserById(id);
   
    if (!user) {
    throw new AppError("User not found", 404);
    }

    const { id: userId, name, email, created_at } = user;

    return {
        id: userId,
        name,
        email,
        createdAt: created_at ?? null
    };
}