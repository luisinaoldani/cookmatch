import { MikroORM } from '@mikro-orm/mysql';
import config from './mikro-orm.config.js';

export let orm: MikroORM;

export async function initORM(): Promise<MikroORM | undefined> {
  try {
    orm = await MikroORM.init(config);
    console.log('Conexión a la base de datos establecida');
    return orm;
  } catch (error) {
    console.warn('No se pudo conectar a la base de datos. El servidor sigue arriba, pero las rutas que la necesiten van a fallar.');
    console.warn((error as Error).message);
    return undefined;
  }
}
