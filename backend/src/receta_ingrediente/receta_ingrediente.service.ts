import { RecetaIngredienteRepository } from './receta_ingrediente.repository.js';
import { RecetaIngrediente } from './receta_ingrediente.entity.js';
import type { Receta } from '../receta/receta.entity.js';
import type { RecetaIngredienteCreateInput, RecetaIngredienteUpdateInput } from './receta_ingrediente.schema.js';
import { BadRequestError, NotFoundError } from '../shared/errors.js';

const repository = new RecetaIngredienteRepository();

export class RecetaIngredienteService {
  async getAll(): Promise<RecetaIngrediente[]> {
    return repository.findAll();
  }

  async getById(idReceta: number, idIngrediente: number): Promise<RecetaIngrediente> {
    const item = await repository.findById(idReceta, idIngrediente);
    if (!item) {
      throw new NotFoundError('Relación receta-ingrediente no encontrada');
    }
    return item;
  }

  async create(data: RecetaIngredienteCreateInput): Promise<RecetaIngrediente> {
    const existente = await repository.findById(data.receta.id, data.ingrediente.id);
    if (existente) {
      throw new BadRequestError('La receta ya tiene ese ingrediente');
    }

    const nuevoItem = new RecetaIngrediente({
      receta: data.receta as Receta,
      ingrediente: data.ingrediente as any,
      cantidad: data.cantidad,
      unidadMedida: data.unidadMedida,
    });

    return repository.create(nuevoItem);
  }

  async update(idReceta: number, idIngrediente: number, data: RecetaIngredienteUpdateInput): Promise<RecetaIngrediente> {
    const existente = await repository.findById(idReceta, idIngrediente);
    if (!existente) {
      throw new NotFoundError('Relación receta-ingrediente no encontrada');
    }

    const actualizada = new RecetaIngrediente({
      receta: { id: idReceta } as Receta,
      ingrediente: data.ingrediente as any,
      cantidad: data.cantidad,
      unidadMedida: data.unidadMedida,
    });

    await repository.update(idReceta, idIngrediente, actualizada);
    return actualizada;
  }

  async delete(idReceta: number, idIngrediente: number): Promise<void> {
    const eliminada = await repository.delete(idReceta, idIngrediente);
    if (!eliminada) {
      throw new NotFoundError('Relación receta-ingrediente no encontrada');
    }
  }
}
