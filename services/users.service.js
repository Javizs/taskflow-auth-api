import { findAllUsers, findUserById } from "../repositories/users.repository.js";

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
    const user = await findUserById(id);

    if (!user) {
        return null;
    }

    const { id: userId, name, email, created_at } = user;

    return {
        id: userId,
        name,
        email,
        createdAt: created_at ?? null
    };
}