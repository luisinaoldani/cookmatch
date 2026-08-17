import { MikroORM } from '@mikro-orm/mysql';
import config from './mikro-orm.config.js';

// Se exporta "let" (no "const") porque se asigna recién dentro de
// initORM(), una vez que MikroORM.init() resuelve.
export let orm: MikroORM;

// Igual que el pool de mysql2 que reemplaza: si no hay credenciales o la
// base no está arriba, el servidor arranca igual y avisa por consola en
// vez de crashear. Las rutas que necesiten la base van a fallar recién
// cuando alguien las use (orm quedará undefined).
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
