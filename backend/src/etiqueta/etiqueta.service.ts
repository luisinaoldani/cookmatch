import { EtiquetaRepository } from './etiqueta.repository.js';
import { Etiqueta } from './etiqueta.entity.js';
import type { EtiquetaInput } from './etiqueta.schema.js';
import { NotFoundError } from '../shared/errors.js';

const repository = new EtiquetaRepository();

export class EtiquetaService {
  async getAll(): Promise<Etiqueta[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Etiqueta> {
    const etiqueta = await repository.findById(id);
    if (!etiqueta) {
      throw new NotFoundError('Etiqueta no encontrada');
    }
    return etiqueta;
  }

  async create(data: EtiquetaInput): Promise<Etiqueta> {
    const nuevaEtiqueta = new Etiqueta({ nombre: data.nombre });
    return repository.create(nuevaEtiqueta);
  }

  async update(id: number, data: EtiquetaInput): Promise<Etiqueta> {
    const existente = await repository.findById(id);
    if (!existente) {
      throw new NotFoundError('Etiqueta no encontrada');
    }
    const actualizada = new Etiqueta({ nombre: data.nombre });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new NotFoundError('Etiqueta no encontrada');
    }
  }
}
