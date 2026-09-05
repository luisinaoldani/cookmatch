import { PasoRepository } from './paso.repository.js';
import { Paso } from './paso.entity.js';
import type { PasoCreateInput, PasoUpdateInput } from './paso.schema.js';
import { NotFoundError } from '../shared/errors.js'; //Agrega la importación de NotFoundError desde el archivo de errores compartidos para manejar casos donde un paso no se encuentra en la base de datos.

const repository = new PasoRepository();

export class PasoService {
  async getAll(): Promise<Paso[]> {
    return repository.findAll();
  }

  async getById(idReceta: number, numero: number): Promise<Paso> {
    const paso = await repository.findById(idReceta, numero);
    if (!paso) {
      throw new NotFoundError('Paso no encontrado');
    }
    return paso;
  }

  async create(data: PasoCreateInput): Promise<Paso> {
    const nuevoPaso = new Paso({ idReceta: data.idReceta, descripcion: data.descripcion });
    return repository.create(nuevoPaso);
  }

  async update(idReceta: number, numero: number, data: PasoUpdateInput): Promise<Paso> {
    const existente = await repository.findById(idReceta, numero);
    if (!existente) {
      throw new NotFoundError('Paso no encontrado');
    }
    const actualizada = new Paso({ idReceta, numero, descripcion: data.descripcion });
    await repository.update(idReceta, numero, actualizada);
    return actualizada;
  }

  async delete(idReceta: number, numero: number): Promise<void> {
    const eliminada = await repository.delete(idReceta, numero);
    if (!eliminada) {
      throw new NotFoundError('Paso no encontrado');
    }
  }
}