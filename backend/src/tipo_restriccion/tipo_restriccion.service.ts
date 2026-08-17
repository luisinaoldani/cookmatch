import { TipoRestriccionRepository } from './tipo_restriccion.repository.js';
import { TipoRestriccion } from './tipo_restriccion.entity.js';

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

  async create(data: { tipo?: string }): Promise<TipoRestriccion> {
    if (!data.tipo || data.tipo.trim() === '') {
      throw new Error('El tipo de restricción es obligatorio');
    }

    const nuevoTipo = new TipoRestriccion({
      tipo: data.tipo.trim(),
    });

    return repository.create(nuevoTipo);
  }

  async update(id: number, data: { tipo?: string }): Promise<TipoRestriccion> {
    if (!data.tipo || data.tipo.trim() === '') {
      throw new Error('El tipo de restricción es obligatorio');
    }

    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Tipo de restricción no encontrado');
    }

    const actualizado = new TipoRestriccion({
      tipo: data.tipo.trim(),
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
