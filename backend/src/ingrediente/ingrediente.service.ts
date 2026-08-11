import { IngredienteRepository } from './ingrediente.repository.js';
import { Ingrediente } from './ingrediente.entity.js';

const repository = new IngredienteRepository();

export class IngredienteService {
  async getAll(): Promise<Ingrediente[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Ingrediente> {
    const ingrediente = await repository.findById(id);
    if (!ingrediente) {
      throw new Error('Ingrediente no encontrado');
    }
    return ingrediente;
  }

  async create(data: { nombre?: string }): Promise<Ingrediente> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del ingrediente es obligatorio');
    }
    const nuevoIngrediente = new Ingrediente({ nombre: data.nombre.trim() });
    return repository.create(nuevoIngrediente);
  }

  async update(id: number, data: { nombre?: string }): Promise<Ingrediente> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre del ingrediente es obligatorio');
    }
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Ingrediente no encontrado');
    }
    const actualizada = new Ingrediente({ id, nombre: data.nombre.trim() });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Ingrediente no encontrado');
    }
  }
}