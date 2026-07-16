import express from 'express';

const app = express();
const PORT = 3000;

// middleware (aparece en el video api04):
app.use(express.json());

// test con ruta de prueba: 
app.get('/', (req, res) => {
  res.json({ mensaje: 'El servidor está funcionando correctamente' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo y escuchando en http://localhost:${PORT}`);
});