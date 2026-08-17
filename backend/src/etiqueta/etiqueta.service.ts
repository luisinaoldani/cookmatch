import { EtiquetaRepository } from './etiqueta.repository.js';
import { Etiqueta } from './etiqueta.entity.js';

// El Service contiene la lógica de negocio y las validaciones.
// No sabe nada de SQL: le delega todo el acceso a datos al Repository.
const repository = new EtiquetaRepository();

export class EtiquetaService {
  async getAll(): Promise<Etiqueta[]> {
    return repository.findAll();
  }

  async getById(id: number): Promise<Etiqueta> {
    const etiqueta = await repository.findById(id);
    if (!etiqueta) {
      throw new Error('Etiqueta no encontrada');
    }
    return etiqueta;
  }

  async create(data: { nombre?: string }): Promise<Etiqueta> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la etiqueta es obligatorio');
    }
    const nuevaEtiqueta = new Etiqueta({ nombre: data.nombre.trim() });
    return repository.create(nuevaEtiqueta);
  }

  async update(id: number, data: { nombre?: string }): Promise<Etiqueta> {
    if (!data.nombre || data.nombre.trim() === '') {
      throw new Error('El nombre de la etiqueta es obligatorio');
    }
    const existente = await repository.findById(id);
    if (!existente) {
      throw new Error('Etiqueta no encontrada');
    }
    const actualizada = new Etiqueta({ nombre: data.nombre.trim() });
    await repository.update(id, actualizada);
    return actualizada;
  }

  async delete(id: number): Promise<void> {
    const eliminada = await repository.delete(id);
    if (!eliminada) {
      throw new Error('Etiqueta no encontrada');
    }
  }
}
