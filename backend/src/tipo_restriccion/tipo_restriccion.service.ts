import { TipoRestriccionRepository } from './tipo_restriccion.repository.js';
import { TipoRestriccion } from './tipo_restriccion.entity.js';
import type { TipoRestriccionInput } from './tipo_restriccion.schema.js';
import { NotFoundError } from '../shared/errors.js'; //Agrega la importación de NotFoundError desde el archivo de errores compartidos para manejar casos donde un tipo de restricción no se encuentra en la base de datos.

const repository = new TipoRestriccionRepository();

export class TipoRestriccionService {
  async getAll(): Promise<TipoRestriccion[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<TipoRestriccion> {
    const tipo = await repository.findById(id);
    if (!tipo) {
      throw new NotFoundError('Tipo de restricción no encontrado');
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
      throw new NotFoundError('Tipo de restricción no encontrado');
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
      throw new NotFoundError('Tipo de restricción no encontrado');
    }
  }
}
