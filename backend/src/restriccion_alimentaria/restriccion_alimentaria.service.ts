import { RestriccionAlimentariaRepository } from './restriccion_alimentaria.repository.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';
import type { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';
import type { RestriccionAlimentariaInput } from './restriccion_alimentaria.schema.js';

const repository = new RestriccionAlimentariaRepository();

export class RestriccionAlimentariaService {
  async getAll(): Promise<RestriccionAlimentaria[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<RestriccionAlimentaria> {
    const restriccion = await repository.findById(id);
    if (!restriccion) {
      throw new Error('Restricción alimentaria no encontrada');
    }
    return restriccion;
  }

  async create(data: RestriccionAlimentariaInput): Promise<RestriccionAlimentaria> {
    const nuevaRestriccion = new RestriccionAlimentaria({
      // Zod solo garantiza { id: number }; el repository es quien arma la
      // referencia real con getReference(), así que acá alcanza con el id.
      tipoRestriccion: data.tipoRestriccion as TipoRestriccion,
      nombre: data.nombre,
      descripcion: data.descripcion,
    });

    return repository.create(nuevaRestriccion);
  }

  async update(id: number, data: RestriccionAlimentariaInput): Promise<RestriccionAlimentaria> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Restricción alimentaria no encontrada');
    }

    const actualizada = new RestriccionAlimentaria({
      tipoRestriccion: data.tipoRestriccion as TipoRestriccion,
      nombre: data.nombre,
      descripcion: data.descripcion,
    });

    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Restricción alimentaria no encontrada');
    }
  }
}
