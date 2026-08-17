import { orm } from '../shared/database/db.js';
import { Etiqueta } from './etiqueta.entity.js';

export class EtiquetaRepository {
  async findAll(): Promise<Etiqueta[]> {
    return orm.em.findAll(Etiqueta);
  }

  async findById(id: number): Promise<Etiqueta | null> {
    return orm.em.findOne(Etiqueta, { id });
  }

  async create(entidad: Etiqueta): Promise<Etiqueta> {
    const nueva = orm.em.create(Etiqueta, { nombre: entidad.nombre });
    await orm.em.flush();
    return nueva;
  }

  async update(id: number, entidad: Etiqueta): Promise<boolean> {
    const existente = await orm.em.findOne(Etiqueta, { id });
    if (!existente) return false;
    existente.nombre = entidad.nombre;
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(Etiqueta, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}