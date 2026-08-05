import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import {
    findUserByEmail,
    createUser
} from "../repositories/users.repository.js";
export async function registerUser({name,email,password}){
    if (typeof name !== "string" || name.trim() === ""){
        throw new AppError("Se debe insertar un nombre", 400)
    }
    if (typeof email !== "string" || email.trim() === "") {
    throw new AppError("Se debe insertar un email", 400);
}

if (typeof password !== "string" || password.trim() === "") {
    throw new AppError("Se debe insertar una contraseña", 400);
}

const normalizedName = name.trim();
const normalizedEmail = email.trim().toLowerCase();

const existingUser = await findUserByEmail(normalizedEmail);

if (existingUser) {
    throw new AppError("El email ya está registrado", 409);
}

const passwordHash = await bcrypt.hash(password, 10);

const userId = await createUser(
    normalizedName,
    normalizedEmail,
    passwordHash
);

return {
    id: userId,
    name: normalizedName,
    email: normalizedEmail
};
}