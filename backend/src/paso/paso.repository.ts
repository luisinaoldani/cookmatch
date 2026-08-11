import { Paso } from './paso.entity.js';
export class PasoRepository {
  async findAll(): Promise<Paso[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(idReceta: number, numero: number): Promise<Paso | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(paso: Paso): Promise<Paso> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(idReceta: number, numero: number, paso: Paso): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(idReceta: number, numero: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}