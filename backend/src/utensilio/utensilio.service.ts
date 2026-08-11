import { UtensilioRepository } from './utensilio.repository.js';
import { Utensilio } from './utensilio.entity.js';

const repository = new UtensilioRepository();

export class UtensilioService {
  async getAll(): Promise<Utensilio[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Utensilio> {
    const utensilio = await repository.findById(id);
    if (!utensilio) {
      throw new Error('Utensilio no encontrado');
    }
    return utensilio;
  }

  async create(data: { nombre?: string }): Promise<Utensilio> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del utensilio es obligatorio');
    }
    const nuevoUtensilio = new Utensilio({ nombre: data.nombre.trim() });
    return repository.create(nuevoUtensilio);
  }

  async update(id: number, data: { nombre?: string }): Promise<Utensilio> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del utensilio es obligatorio');
    }
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Utensilio no encontrado');
    }
    const actualizada = new Utensilio({ id, nombre: data.nombre.trim() });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Utensilio no encontrado');
    }
  }
}