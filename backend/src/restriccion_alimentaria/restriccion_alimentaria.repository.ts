import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';

export class RestriccionAlimentariaRepository {
  async findAll(): Promise<RestriccionAlimentaria[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(id: number): Promise<RestriccionAlimentaria | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(restriccion: RestriccionAlimentaria): Promise<RestriccionAlimentaria> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(id: number, restriccion: RestriccionAlimentaria): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}
