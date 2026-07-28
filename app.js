import express from "express";
import usersRouter from "./routes/users.routes.js";

const app = express();
const PORT = 3000;

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "api funcional"
    });
});

app.use("/api/users", usersRouter);

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        success: false,
        error: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
