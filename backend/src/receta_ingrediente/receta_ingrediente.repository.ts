import { RecetaIngrediente } from './receta_ingrediente.entity.js';

export class RecetaIngredienteRepository {
  async findAll(): Promise<RecetaIngrediente[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(idReceta: number, idIngrediente: number): Promise<RecetaIngrediente | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(item: RecetaIngrediente): Promise<RecetaIngrediente> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(idReceta: number, idIngrediente: number, item: RecetaIngrediente): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(idReceta: number, idIngrediente: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}
