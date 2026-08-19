import { RestriccionAlimentariaRepository } from './restriccion_alimentaria.repository.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';
import type { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';
import type { RestriccionAlimentariaInput } from './restriccion_alimentaria.schema.js';

const repository = new RestriccionAlimentariaRepository();

export class RestriccionAlimentariaService {
  async getAll(): Promise<RestriccionAlimentaria[]> {
    return repository.findAll();
  }

  async getById(idTipoRestriccion: number, nombre: string): Promise<RestriccionAlimentaria> {
    const restriccion = await repository.findById(idTipoRestriccion, nombre);
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

  async update(idTipoRestriccion: number, nombre: string, data: RestriccionAlimentariaInput): Promise<RestriccionAlimentaria> {
    const existente = await repository.findById(idTipoRestriccion, nombre);
    if (!existente) {
      throw new Error('Restricción alimentaria no encontrada');
    }

    const actualizada = new RestriccionAlimentaria({
      tipoRestriccion: data.tipoRestriccion as TipoRestriccion,
      nombre: data.nombre,
      descripcion: data.descripcion,
    });

    await repository.update(idTipoRestriccion, nombre, actualizada);
    return actualizada;
  }

  async delete(idTipoRestriccion: number, nombre: string): Promise<void> {
    const eliminada = await repository.delete(idTipoRestriccion, nombre);
    if (!eliminada) {
      throw new Error('Restricción alimentaria no encontrada');
    }
  }
}
