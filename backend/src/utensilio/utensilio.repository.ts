import { orm } from '../db.js';
import { Utensilio } from './utensilio.entity.js';

export class UtensilioRepository {
  async findAll(): Promise<Utensilio[]> {
    return orm.em.findAll(Utensilio);
  }

  async findById(id: number): Promise<Utensilio | null> {
    return orm.em.findOne(Utensilio, { id });
  }

  async create(entidad: Utensilio): Promise<Utensilio> {
    const nueva = orm.em.create(Utensilio, { nombre: entidad.nombre });
    await orm.em.flush();
    return nueva;
  }

  async update(id: number, entidad: Utensilio): Promise<boolean> {
    const existente = await orm.em.findOne(Utensilio, { id });
    if (!existente) return false;
    existente.nombre = entidad.nombre;
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(Utensilio, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}