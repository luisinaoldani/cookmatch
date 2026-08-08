// 1. Importamos dotenv de forma moderna para leer el archivo .env
import 'dotenv/config';

// 2. Importamos express de forma moderna
import express from 'express';
const app = express();

// 3. Usamos el puerto que definieron en el .env (el 3000)
const PORT = process.env.PORT || 3000;

// Permite que el servidor entienda datos en formato JSON
app.use(express.json());

// 4. Creamos la ruta de prueba
app.get('/', (req, res) => {
    res.send('¡Hola! El backend de CookMatch está funcionando correctamente moderno 🍳');
});

// 5. Encendemos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
});