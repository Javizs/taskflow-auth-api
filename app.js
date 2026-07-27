import express from 'express';
const app = express();
const PORT = 3000;

app.get('/api/health',(req,res) => {
    res.status(200).json({
        status:'api funcional'
    });
});


app.listen(PORT,() => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})