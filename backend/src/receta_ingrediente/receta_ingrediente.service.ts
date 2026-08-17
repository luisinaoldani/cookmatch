import { RecetaIngredienteRepository } from './receta_ingrediente.repository.js';
import { RecetaIngrediente } from './receta_ingrediente.entity.js';

const repository = new RecetaIngredienteRepository();

export class RecetaIngredienteService {
  async getAll(): Promise<RecetaIngrediente[]> {
    return repository.findAll();
  }

  async getById(idReceta: number, idIngrediente: number): Promise<RecetaIngrediente> {
    const item = await repository.findById(idReceta, idIngrediente);
    if (!item) {
      throw new Error('Relación receta-ingrediente no encontrada');
    }
    return item;
  }

  async create(data: {
    receta?: any;
    ingrediente?: any;
    cantidad?: number;
    unidadMedida?: string;
  }): Promise<RecetaIngrediente> {
    if (data.receta === undefined || !data.receta.id) {
      throw new Error('Debe enviarse una receta válida');
    }
    if (!data.ingrediente || !data.ingrediente.id) {
      throw new Error('Debe enviarse un ingrediente válido');
    }
    if (data.cantidad === undefined || Number(data.cantidad) <= 0) {
      throw new Error('La cantidad del ingrediente es obligatoria');
    }
    if (!data.unidadMedida || data.unidadMedida.trim() === '') {
      throw new Error('La unidad de medida es obligatoria');
    }

    const nuevoItem = new RecetaIngrediente({
      receta: data.receta,
      ingrediente: data.ingrediente,
      cantidad: Number(data.cantidad),
      unidadMedida: data.unidadMedida.trim(),
    });

    return repository.create(nuevoItem);
  }

  async update(idReceta: number, idIngrediente: number, data: {
    receta?: any;
    ingrediente?: any;
    cantidad?: number;
    unidadMedida?: string;
  }): Promise<RecetaIngrediente> {
    if (!data.ingrediente || !data.ingrediente.id) {
      throw new Error('Debe enviarse un ingrediente válido');
    }
    if (data.cantidad === undefined || Number(data.cantidad) <= 0) {
      throw new Error('La cantidad del ingrediente es obligatoria');
    }
    if (!data.unidadMedida || data.unidadMedida.trim() === '') {
      throw new Error('La unidad de medida es obligatoria');
    }

    const existente = await repository.findById(idReceta, idIngrediente);
    if (!existente) {
      throw new Error('Relación receta-ingrediente no encontrada');
    }

    const actualizada = new RecetaIngrediente({
      receta: data.receta,
      ingrediente: data.ingrediente,
      cantidad: Number(data.cantidad),
      unidadMedida: data.unidadMedida.trim(),
    });

    await repository.update(idReceta, idIngrediente, actualizada);
    return actualizada;
  }

  async delete(idReceta: number, idIngrediente: number): Promise<void> {
    const eliminada = await repository.delete(idReceta, idIngrediente);
    if (!eliminada) {
      throw new Error('Relación receta-ingrediente no encontrada');
    }
  }
}
