import { RecetaRepository } from './receta.repository.js';
import { Receta } from './receta.entity.js';
import type { RecetaInput } from './receta.schema.js';

const repository = new RecetaRepository();

export class RecetaService {
  async getAll(etiquetaIds?: number[]): Promise<Receta[]> {
    if (etiquetaIds && etiquetaIds.length > 0) {
      return repository.findByEtiquetas(etiquetaIds);
    }
    return repository.findAll();
  }

  async getById(id: number): Promise<Receta> {
    const receta = await repository.findById(id);
    if (!receta) {
      throw new Error('Receta no encontrada');
    }
    return receta;
  }

  async create(data: RecetaInput): Promise<Receta> {
    const nuevaReceta = new Receta({
      nombre: data.nombre,
      dificultad: data.dificultad,
      tiempoMin: data.tiempoMin,
      estado: data.estado,
      etiquetas: data.etiquetas,
      utensilios: data.utensilios,
    });

    return repository.create(nuevaReceta);
  }

  async update(id: number, data: RecetaInput): Promise<Receta> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Receta no encontrada');
    }

    const actualizada = new Receta({
      nombre: data.nombre,
      dificultad: data.dificultad,
      tiempoMin: data.tiempoMin,
      estado: data.estado,
      etiquetas: data.etiquetas,
      utensilios: data.utensilios,
    });

    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Receta no encontrada');
    }
  }
}