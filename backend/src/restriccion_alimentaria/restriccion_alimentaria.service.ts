import { RestriccionAlimentariaRepository } from './restriccion_alimentaria.repository.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';

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

  async create(data: { tipoRestriccion?: any; nombre?: string; descripcion?: string }): Promise<RestriccionAlimentaria> {
    if (!data.tipoRestriccion || !data.tipoRestriccion.id) {
      throw new Error('Debe enviarse un tipo de restricción válido');
    }
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la restricción es obligatorio');
    }

    const nuevaRestriccion = new RestriccionAlimentaria({
      tipoRestriccion: data.tipoRestriccion,
      nombre: data.nombre.trim(),
      descripcion: data.descripcion?.trim(),
    });

    return repository.create(nuevaRestriccion);
  }

  async update(idTipoRestriccion: number, nombre: string, data: { tipoRestriccion?: any; nombre?: string; descripcion?: string }): Promise<RestriccionAlimentaria> {
    if (!data.tipoRestriccion || !data.tipoRestriccion.id) {
      throw new Error('Debe enviarse un tipo de restricción válido');
    }
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la restricción es obligatorio');
    }

    const existente = await repository.findById(idTipoRestriccion, nombre);
    if (!existente) {
      throw new Error('Restricción alimentaria no encontrada');
    }

    const actualizada = new RestriccionAlimentaria({
      tipoRestriccion: data.tipoRestriccion,
      nombre: data.nombre.trim(),
      descripcion: data.descripcion?.trim(),
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
