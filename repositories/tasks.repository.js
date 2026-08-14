import { pool } from "../config/db.js";

export async function insertTask(title, projectId) {
    const [result] = await pool.execute(
        "INSERT INTO tasks (title, project_id) VALUES (?, ?)",
        [title, projectId]
    );

    return result.insertId;
}
export async function findProjectWithTasks(projectId) {
    const [rows] = await pool.execute(
        `SELECT
            p.id AS project_id,
            p.name AS project_name,
            p.user_id,
            t.id AS task_id,
            t.title AS task_title
        FROM projects p
        LEFT JOIN tasks t ON t.project_id = p.id
        WHERE p.id = ?`,
        [projectId]
    );

    return rows;
}