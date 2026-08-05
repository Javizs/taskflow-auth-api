import { pool } from "../config/db.js";

export async function findAllUsers() {
    const [rows] = await pool.execute(
        "SELECT id, name, email, created_at FROM users"
    );

    return rows;
}

export async function findUserById(id) {
    const [rows] = await pool.execute(
        "SELECT id, name, email, created_at FROM users WHERE id = ?",
        [id]
    );

    return rows[0];
}
export async function findUserByEmail(email){
    const [rows] = await pool.execute(
    "SELECT id, name, email, password_hash, created_at FROM users WHERE email = ?",
    [email]
);
    return rows[0];
}
export async function createUser(name, email, passwordHash) {
    const [result] = await pool.execute(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
        [name, email, passwordHash]
    );

    return result.insertId;
}