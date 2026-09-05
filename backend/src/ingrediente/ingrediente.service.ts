import { IngredienteRepository } from './ingrediente.repository.js';
import { Ingrediente } from './ingrediente.entity.js';
import type { IngredienteInput } from './ingrediente.schema.js';
import { NotFoundError } from '../shared/errors.js'; //Agrega la importación de NotFoundError desde el archivo de errores compartidos para manejar casos donde un ingrediente no se encuentra en la base de datos.

const repository = new IngredienteRepository();

export class IngredienteService {
  async getAll(): Promise<Ingrediente[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Ingrediente> {
    const ingrediente = await repository.findById(id);
    if (!ingrediente) {
      throw new NotFoundError('Ingrediente no encontrado');
    }
    return ingrediente;
  }

  async create(data: IngredienteInput): Promise<Ingrediente> {
    const nuevoIngrediente = new Ingrediente({ nombre: data.nombre });
    return repository.create(nuevoIngrediente);
  }

  async update(id: number, data: IngredienteInput): Promise<Ingrediente> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new NotFoundError('Ingrediente no encontrado');
    }
    const actualizada = new Ingrediente({ nombre: data.nombre });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new NotFoundError('Ingrediente no encontrado');
    }
  }
}