import { AppError } from "../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

export async function loginUser({ email, password }) {
    if (typeof email !== "string" || email.trim() === "") {
        throw new AppError("Se debe insertar un email", 400);
    }

    if (typeof password !== "string" || password.trim() === "") {
        throw new AppError("Se debe insertar una contraseña", 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await findUserByEmail(normalizedEmail);

    if (!user) {
        throw new AppError("Credenciales inválidas", 401);
    }

    const passwordMatches = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!passwordMatches) {
        throw new AppError("Credenciales inválidas", 401);
    }

    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET no está configurado");
    }

    const token = jwt.sign(
       { sub: user.id, role: user.role },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN || "1h"
        }
    );

    return {
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    };
}