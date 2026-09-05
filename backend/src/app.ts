import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { RequestContext } from '@mikro-orm/core';
import { initORM, orm } from './db.js';

import recetaRoutes from './receta/receta.routes.js';
import recetaIngredienteRoutes from './receta_ingrediente/receta_ingrediente.routes.js';
import tipoRestriccionRoutes from './tipo_restriccion/tipo_restriccion.routes.js';
import restriccionAlimentariaRoutes from './restriccion_alimentaria/restriccion_alimentaria.routes.js';
import etiquetaRoutes from './etiqueta/etiqueta.routes.js';
import ingredienteRoutes from './ingrediente/ingrediente.routes.js';
import utensilioRoutes from './utensilio/utensilio.routes.js';
import pasoRoutes from './paso/paso.routes.js';
import { errorHandler } from './shared/errorHandler.js';

async function bootstrap() {
  await initORM();

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Sin esto, el navegador bloquea las requests del frontend antes de que lleguen acá.
  // origin: la URL del frontend en dev. Para aprobación se debe tomar
  // de una env var en vez de dejarla hardcodeada (para AD).
  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

  app.use(express.json());

  // El em.fork() llevado a HTTP: crea un EntityManager nuevo
  // por request, con su propio identity map vacío. Sin esto, todos los
  // requests comparten el mismo EntityManager y eso mezcla datos entre usuarios.
  app.use((req, res, next) => {
    if (!orm) return next(); // sin conexión a la base, seguimos sin RequestContext
    RequestContext.create(orm.em, next);
  });

  // El prefijo /api es lo que ya espera axiosConfig.ts del frontend
  // (VITE_API_URL o el default http://localhost:3000/api).
  app.use('/api/recetas', recetaRoutes);
  app.use('/api/recetas-ingredientes', recetaIngredienteRoutes);
  app.use('/api/tipos-restriccion', tipoRestriccionRoutes);
  app.use('/api/restricciones-alimentarias', restriccionAlimentariaRoutes);
  app.use('/api/etiquetas', etiquetaRoutes);
  app.use('/api/ingredientes', ingredienteRoutes);
  app.use('/api/utensilios', utensilioRoutes);
  app.use('/api/pasos', pasoRoutes);

  app.get('/', (req, res) => {
    res.send('El backend está funcionando correctamente');
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
  });
}

bootstrap();
