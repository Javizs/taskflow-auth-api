import { pool } from "../config/db.js";

export async function findAllUsers() {
    const [rows] = await pool.execute(
        "SELECT id, name, email, created_at FROM users"
    );

    return rows;
}
