import { pool } from "../config/db.js";

export async function createProject(name, description, userId) {
    const [result] = await pool.execute(
        "INSERT INTO projects (name, description, user_id) VALUES (?, ?, ?)",
        [name, description, userId]
    );

    return result.insertId;
}

export async function findProjectsByUserId(userId) {
    const [rows] = await pool.execute(
        "SELECT id, name, description, user_id, created_at FROM projects WHERE user_id = ?",
        [userId]
    );

    return rows;
}
export async function findProjectById(id) {
    const [rows] = await pool.execute(
        "SELECT id, name, description, user_id, created_at FROM projects WHERE id = ?",
        [id]
    );

    return rows[0];
}