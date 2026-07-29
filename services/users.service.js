import { findAllUsers, findUserById } from "../repositories/users.repository.js";

export async function getAllUsers() {
    return await findAllUsers();
}

export async function getUserByIdService(id) {
    return await findUserById(id);
}
