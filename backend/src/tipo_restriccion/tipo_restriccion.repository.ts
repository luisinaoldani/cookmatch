import { TipoRestriccion } from './tipo_restriccion.entity.js';

export class TipoRestriccionRepository {
  async findAll(): Promise<TipoRestriccion[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(id: number): Promise<TipoRestriccion | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(tipoRestriccion: TipoRestriccion): Promise<TipoRestriccion> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(id: number, tipoRestriccion: TipoRestriccion): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}
