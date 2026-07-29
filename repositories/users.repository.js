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
