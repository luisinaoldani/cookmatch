import { TipoRestriccionRepository } from './tipo_restriccion.repository.js';
import { TipoRestriccion } from './tipo_restriccion.entity.js';
import type { TipoRestriccionInput } from './tipo_restriccion.schema.js';

const repository = new TipoRestriccionRepository();

export class TipoRestriccionService {
  async getAll(): Promise<TipoRestriccion[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<TipoRestriccion> {
    const tipo = await repository.findById(id);
    if (!tipo) {
      throw new Error('Tipo de restricción no encontrado');
    }
    return tipo;
  }

  async create(data: TipoRestriccionInput): Promise<TipoRestriccion> {
    const nuevoTipo = new TipoRestriccion({
      tipo: data.tipo,
    });

    return repository.create(nuevoTipo);
  }

  async update(id: number, data: TipoRestriccionInput): Promise<TipoRestriccion> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Tipo de restricción no encontrado');
    }

    const actualizado = new TipoRestriccion({
      tipo: data.tipo,
    });

    await repository.update(id, actualizado);
    return actualizado;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Tipo de restricción no encontrado');
    }
  }
}
