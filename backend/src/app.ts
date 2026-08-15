import 'dotenv/config';
import express from 'express';
import recetaRoutes from './receta/receta.routes.js';
import recetaIngredienteRoutes from './receta_ingrediente/receta_ingrediente.routes.js';
import tipoRestriccionRoutes from './tipo_restriccion/tipo_restriccion.routes.js';
import restriccionAlimentariaRoutes from './restriccion_alimentaria/restriccion_alimentaria.routes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/recetas', recetaRoutes);
app.use('/recetas-ingredientes', recetaIngredienteRoutes);
app.use('/tipos-restriccion', tipoRestriccionRoutes);
app.use('/restricciones-alimentarias', restriccionAlimentariaRoutes);

app.get('/', (req, res) => {
    res.send('El backend está funcionando correctamente');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
});