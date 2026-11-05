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
import planificacionRoutes from './planificacion/planificacion.routes.js';
import { errorHandler } from './shared/errorHandler.js';

async function bootstrap() {
  await initORM();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

  app.use(express.json());

  app.use((req, res, next) => {
    if (!orm) return next();
    RequestContext.create(orm.em, next);
  });

  app.use('/api/recetas', recetaRoutes);
  app.use('/api/recetas-ingredientes', recetaIngredienteRoutes);
  app.use('/api/tipos-restriccion', tipoRestriccionRoutes);
  app.use('/api/restricciones-alimentarias', restriccionAlimentariaRoutes);
  app.use('/api/etiquetas', etiquetaRoutes);
  app.use('/api/ingredientes', ingredienteRoutes);
  app.use('/api/utensilios', utensilioRoutes);
  app.use('/api/pasos', pasoRoutes);
  app.use('/api/planificacion', planificacionRoutes);

  app.get('/', (req, res) => {
    res.send('El backend está funcionando correctamente');
  });

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
  });
}

bootstrap();
