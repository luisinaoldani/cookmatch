import 'dotenv/config';
import express from 'express';
import { RequestContext } from '@mikro-orm/core';
import { initORM, orm } from './shared/database/db.js';

import recetaRoutes from './receta/receta.routes.js';
import recetaIngredienteRoutes from './receta_ingrediente/receta_ingrediente.routes.js';
import tipoRestriccionRoutes from './tipo_restriccion/tipo_restriccion.routes.js';
import restriccionAlimentariaRoutes from './restriccion_alimentaria/restriccion_alimentaria.routes.js';
import etiquetaRoutes from './etiqueta/etiqueta.routes.js';
import ingredienteRoutes from './ingrediente/ingrediente.routes.js';
import utensilioRoutes from './utensilio/utensilio.routes.js';
import pasoRoutes from './paso/paso.routes.js';

async function bootstrap() {
  await initORM();

  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // El em.fork() del bloque 5 llevado a HTTP: crea un EntityManager nuevo
  // por request, con su propio identity map vacío. Sin esto, todos los
  // requests comparten el mismo EntityManager y eso mezcla datos entre
  // usuarios (ver bloque 6 de la guía).
  app.use((req, res, next) => {
    if (!orm) return next(); // sin conexión a la base, seguimos sin RequestContext
    RequestContext.create(orm.em, next);
  });

  app.use('/recetas', recetaRoutes);
  app.use('/recetas-ingredientes', recetaIngredienteRoutes);
  app.use('/tipos-restriccion', tipoRestriccionRoutes);
  app.use('/restricciones-alimentarias', restriccionAlimentariaRoutes);
  app.use('/etiquetas', etiquetaRoutes);
  app.use('/ingredientes', ingredienteRoutes);
  app.use('/utensilios', utensilioRoutes);
  app.use('/pasos', pasoRoutes);

  app.get('/', (req, res) => {
    res.send('El backend está funcionando correctamente');
  });

  app.listen(PORT, () => {
    console.log(`Servidor corriendo con éxito en http://localhost:${PORT}`);
  });
}

bootstrap();
