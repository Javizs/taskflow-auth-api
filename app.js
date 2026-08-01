import express from "express";
import usersRouter from "./routes/users.routes.js";
import {errorHandler} from "./middlewares/errorHandler.js"
import {notFoundHandler} from "./middlewares/notFoundHandler.js"
const app = express();
const PORT = 3000;

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "api funcional"
    });
});

app.use("/api/users", usersRouter);

app.use(notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
