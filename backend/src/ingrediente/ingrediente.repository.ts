import { Ingrediente } from './ingrediente.entity.js';
export class IngredienteRepository {
  async findAll(): Promise<Ingrediente[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(id: number): Promise<Ingrediente | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(ingrediente: Ingrediente): Promise<Ingrediente> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(id: number, ingrediente: Ingrediente): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}