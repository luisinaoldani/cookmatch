import { RecetaRepository } from './receta.repository.js';
import { Receta } from './receta.entity.js';
import type { RecetaInput } from './receta.schema.js';
import { NotFoundError } from '../shared/errors.js'; //Agrega la importación de NotFoundError desde el archivo de errores compartidos para manejar casos donde una receta no se encuentra en la base de datos.

const repository = new RecetaRepository();

export class RecetaService {
  async getAll(etiquetaIds: number[] = [], restriccionIds: number[] = []): Promise<Receta[]> {
    const hayEtiquetas = etiquetaIds.length > 0;
    const hayRestricciones = restriccionIds.length > 0;

    if (!hayEtiquetas && !hayRestricciones) {
      return repository.findAll();
    }

    if (hayEtiquetas && !hayRestricciones) {
      return repository.findByEtiquetas(etiquetaIds);
    }

    return repository.findByEtiquetasRestricciones(etiquetaIds, restriccionIds);
  }

  async getById(id: number): Promise<Receta> {
    const receta = await repository.findById(id);
    if (!receta) {
      throw new NotFoundError('Receta no encontrada');
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
      restricciones: data.restricciones,
    });

    return repository.create(nuevaReceta);
  }

  async update(id: number, data: RecetaInput): Promise<Receta> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new NotFoundError('Receta no encontrada');
    }

    const actualizada = new Receta({
      nombre: data.nombre,
      dificultad: data.dificultad,
      tiempoMin: data.tiempoMin,
      estado: data.estado,
      etiquetas: data.etiquetas,
      utensilios: data.utensilios,
      restricciones: data.restricciones,
    });

    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new NotFoundError('Receta no encontrada');
    }
  }
}