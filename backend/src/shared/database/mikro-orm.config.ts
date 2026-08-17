import 'dotenv/config';
import { defineConfig } from '@mikro-orm/mysql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

import { Ingrediente } from '../ingrediente/ingrediente.entity.js';
import { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import { Utensilio } from '../utensilio/utensilio.entity.js';
import { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';
import { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';
import { Paso } from '../paso/paso.entity.js';
import { Receta } from '../receta/receta.entity.js';
import { RecetaIngrediente } from '../receta_ingrediente/receta_ingrediente.entity.js';

export default defineConfig({
  entities: [
    Ingrediente,
    Etiqueta,
    Utensilio,
    TipoRestriccion,
    RestriccionAlimentaria,
    Paso,
    Receta,
    RecetaIngrediente,
  ],

  dbName: process.env.DB_NAME ?? 'cookmatch',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  // Lee los tipos desde los .ts (necesario porque corremos con tsx/esbuild,
  // que no emite emitDecoratorMetadata).
  metadataProvider: TsMorphMetadataProvider,

  // Dónde vive cada migración generada y compilada.
  migrations: {
    path: 'dist/migrations',
    pathTs: 'src/migrations',
  },

  // Imprime cada SQL generado. Apagarlo recién cuando el equipo se sienta
  // cómodo leyendo lo que el ORM genera, no antes.
  debug: true,
});