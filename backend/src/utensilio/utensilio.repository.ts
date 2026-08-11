import { Utensilio } from './utensilio.entity.js';
export class UtensilioRepository {
  async findAll(): Promise<Utensilio[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(id: number): Promise<Utensilio | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(utensilio: Utensilio): Promise<Utensilio> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(id: number, utensilio: Utensilio): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}