import { UtensilioRepository } from './utensilio.repository.js';
import { Utensilio } from './utensilio.entity.js';
import type { UtensilioInput } from './utensilio.schema.js';
import { NotFoundError } from '../shared/errors.js'; //Agrega la importación de NotFoundError desde el archivo de errores compartidos para manejar casos donde un utensilio no se encuentra en la base de datos.

const repository = new UtensilioRepository();

export class UtensilioService {
  async getAll(): Promise<Utensilio[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Utensilio> {
    const utensilio = await repository.findById(id);
    if (!utensilio) {
      throw new NotFoundError('Utensilio no encontrado');
    }
    return utensilio;
  }

  async create(data: UtensilioInput): Promise<Utensilio> {
    const nuevoUtensilio = new Utensilio({ nombre: data.nombre });
    return repository.create(nuevoUtensilio);
  }

  async update(id: number, data: UtensilioInput): Promise<Utensilio> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new NotFoundError('Utensilio no encontrado');
    }
    const actualizada = new Utensilio({ nombre: data.nombre });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new NotFoundError('Utensilio no encontrado');
    }
  }
}