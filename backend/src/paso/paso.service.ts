import { PasoRepository } from './paso.repository.js';
import { Paso } from './paso.entity.js';

const repository = new PasoRepository();

export class PasoService {
  async getAll(): Promise<Paso[]> {
    return repository.findAll();
  }

  async getById(idReceta: number, numero: number): Promise<Paso> {
    const paso = await repository.findById(idReceta, numero);
    if (!paso) {
      throw new Error('Paso no encontrado');
    }
    return paso;
  }

  async create(data: { idReceta: number; descripcion?: string }): Promise<Paso> {
    if (!data.descripcion || data.descripcion.trim() === '') {
      throw new Error('La descripción del paso es obligatoria');
    }
    if (data.idReceta === undefined || data.idReceta === null) {
      throw new Error('El idReceta es obligatorio');
    }
    const nuevoPaso = new Paso({ idReceta: data.idReceta, descripcion: data.descripcion.trim() });
    return repository.create(nuevoPaso);
  }

  async update(idReceta: number, numero: number, data: { descripcion?: string }): Promise<Paso> {
    if (!data.descripcion || data.descripcion.trim() === '') {
      throw new Error('La descripción del paso es obligatoria');
    }
    const existente = await repository.findById(idReceta, numero);
    if (!existente) {
      throw new Error('Paso no encontrado');
    }
    const actualizada = new Paso({ idReceta, numero, descripcion: data.descripcion.trim() });
    await repository.update(idReceta, numero, actualizada);
    return actualizada;
  }

  async delete(idReceta: number, numero: number): Promise<void> {
    const eliminada = await repository.delete(idReceta, numero);
    if (!eliminada) {
      throw new Error('Paso no encontrado');
    }
  }
}