import { findAllUsers } from "../repositories/users.repository.js";

export async function getAllUsers() {
    return await findAllUsers();
}