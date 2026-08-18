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
export async function findTasks({ status, priority, limit, offset }, userId) {
    const conditions = ["p.user_id = ?"];
    const params = [userId];

    if (status) {
        conditions.push("t.status = ?");
        params.push(status);
    }

    if (priority) {
        conditions.push("t.priority = ?");
        params.push(priority);
    }

    const sql =
        `SELECT
            t.id,
            t.title,
            t.description,
            t.status,
            t.priority,
            t.project_id AS projectId,
            t.created_at AS createdAt
        FROM tasks t
        INNER JOIN projects p ON p.id = t.project_id
        WHERE ${conditions.join(" AND ")}
        ORDER BY t.created_at DESC
        LIMIT ? OFFSET ?`;

    params.push(limit, offset);

    const [rows] = await pool.execute(sql, params);

    return rows;
}
