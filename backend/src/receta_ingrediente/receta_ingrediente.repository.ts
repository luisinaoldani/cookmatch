import { orm } from '../shared/db.js';
import { RecetaIngrediente } from './receta_ingrediente.entity.js';
import { Receta } from '../receta/receta.entity.js';
import { Ingrediente } from '../ingrediente/ingrediente.entity.js';

export class RecetaIngredienteRepository {
  async findAll(): Promise<RecetaIngrediente[]> {
    return orm.em.findAll(RecetaIngrediente, { populate: ['ingrediente'] });
  }

  async findById(idReceta: number, idIngrediente: number): Promise<RecetaIngrediente | null> {
    return orm.em.findOne(
      RecetaIngrediente,
      { receta: idReceta, ingrediente: idIngrediente },
      { populate: ['ingrediente'] },
    );
  }

  async create(item: RecetaIngrediente): Promise<RecetaIngrediente> {
    const receta = orm.em.getReference(Receta, item.receta.id);
    const ingrediente = orm.em.getReference(Ingrediente, item.ingrediente.id);
    const nuevo = orm.em.create(RecetaIngrediente, {
      receta,
      ingrediente,
      cantidad: item.cantidad,
      unidadMedida: item.unidadMedida,
    });
    await orm.em.flush();
    return nuevo;
  }

  async update(idReceta: number, idIngrediente: number, item: RecetaIngrediente): Promise<boolean> {
    const existente = await orm.em.findOne(RecetaIngrediente, { receta: idReceta, ingrediente: idIngrediente });
    if (!existente) return false;
    existente.cantidad = item.cantidad;
    existente.unidadMedida = item.unidadMedida;
    await orm.em.flush();
    return true;
  }

  async delete(idReceta: number, idIngrediente: number): Promise<boolean> {
    const existente = await orm.em.findOne(RecetaIngrediente, { receta: idReceta, ingrediente: idIngrediente });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}

