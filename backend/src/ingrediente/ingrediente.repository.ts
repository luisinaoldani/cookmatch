import { orm } from '../db.js';
import { Ingrediente } from './ingrediente.entity.js';

export class IngredienteRepository {
  async findAll(): Promise<Ingrediente[]> {
    return orm.em.findAll(Ingrediente);
  }

  async findById(id: number): Promise<Ingrediente | null> {
    return orm.em.findOne(Ingrediente, { id });
  }

  async create(entidad: Ingrediente): Promise<Ingrediente> {
    const nueva = orm.em.create(Ingrediente, { nombre: entidad.nombre });
    await orm.em.flush();
    return nueva;
  }

  async update(id: number, entidad: Ingrediente): Promise<boolean> {
    const existente = await orm.em.findOne(Ingrediente, { id });
    if (!existente) return false;
    existente.nombre = entidad.nombre;
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(Ingrediente, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}