import { RecetaRepository } from './receta.repository.js';
import { Receta } from './receta.entity.js';

const repository = new RecetaRepository();

export class RecetaService {
  async getAll(): Promise<Receta[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Receta> {
    const receta = await repository.findById(id);
    if (!receta) {
      throw new Error('Receta no encontrada');
    }
    return receta;
  }

  async create(data: {
    nombre?: string;
    dificultad?: string;
    tiempoMin?: number;
    estado?: string;
    pasos?: any[];
    ingredientes?: any[];
    etiquetas?: any[];
    utensilios?: any[];
  }): Promise<Receta> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la receta es obligatorio');
    }
    if (!data.dificultad || data.dificultad.trim() === '') {
      throw new Error('La dificultad de la receta es obligatoria');
    }
    if (data.tiempoMin === undefined || Number(data.tiempoMin) <= 0) {
      throw new Error('El tiempo de la receta es obligatorio');
    }
    if (!data.estado || data.estado.trim() === '') {
      throw new Error('El estado de la receta es obligatorio');
    }

    const nuevaReceta = new Receta({
      nombre: data.nombre.trim(),
      dificultad: data.dificultad.trim(),
      tiempoMin: Number(data.tiempoMin),
      estado: data.estado.trim(),
      pasos: data.pasos,
      ingredientes: data.ingredientes,
      etiquetas: data.etiquetas,
      utensilios: data.utensilios,
    });

    return repository.create(nuevaReceta);
  }

  async update(id: number, data: {
    nombre?: string;
    dificultad?: string;
    tiempoMin?: number;
    estado?: string;
    pasos?: any[];
    ingredientes?: any[];
    etiquetas?: any[];
    utensilios?: any[];
  }): Promise<Receta> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la receta es obligatorio');
    }
    if (!data.dificultad || data.dificultad.trim() === '') {
      throw new Error('La dificultad de la receta es obligatoria');
    }
    if (data.tiempoMin === undefined || Number(data.tiempoMin) <= 0) {
      throw new Error('El tiempo de la receta es obligatorio');
    }
    if (!data.estado || data.estado.trim() === '') {
      throw new Error('El estado de la receta es obligatorio');
    }

    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Receta no encontrada');
    }

    const actualizada = new Receta({
      id,
      nombre: data.nombre.trim(),
      dificultad: data.dificultad.trim(),
      tiempoMin: Number(data.tiempoMin),
      estado: data.estado.trim(),
      pasos: data.pasos,
      ingredientes: data.ingredientes,
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
