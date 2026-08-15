import { RestriccionAlimentariaRepository } from './restriccion_alimentaria.repository.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';

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

  async update(id: number, data: { tipoRestriccion?: any; nombre?: string; descripcion?: string }): Promise<RestriccionAlimentaria> {
    if (!data.tipoRestriccion || !data.tipoRestriccion.id) {
      throw new Error('Debe enviarse un tipo de restricción válido');
    }
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la restricción es obligatorio');
    }

    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Restricción alimentaria no encontrada');
    }

    const actualizada = new RestriccionAlimentaria({
      tipoRestriccion: data.tipoRestriccion,
      nombre: data.nombre.trim(),
      descripcion: data.descripcion?.trim(),
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
