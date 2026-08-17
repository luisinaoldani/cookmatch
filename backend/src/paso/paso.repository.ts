import { orm } from '../shared/database/db.js';
import { Paso } from './paso.entity.js';
import { Receta } from '../receta/receta.entity.js';

export class PasoRepository {
  async findAll(): Promise<Paso[]> {
    return orm.em.findAll(Paso);
  }

  async findById(idReceta: number, numero: number): Promise<Paso | null> {
    return orm.em.findOne(Paso, { receta: idReceta, numero });
  }

  async create(paso: Paso): Promise<Paso> {
    const idReceta = paso.idReceta;
    if (idReceta === undefined) {
      throw new Error('El idReceta es obligatorio');
    }
    const receta = orm.em.getReference(Receta, idReceta);
    const numero = await this.proximoNumero(idReceta);
    const nuevo = orm.em.create(Paso, { receta, numero, descripcion: paso.descripcion });
    await orm.em.flush();
    return nuevo;
  }

  async update(idReceta: number, numero: number, paso: Paso): Promise<boolean> {
    const existente = await orm.em.findOne(Paso, { receta: idReceta, numero });
    if (!existente) return false;
    existente.descripcion = paso.descripcion;
    await orm.em.flush();
    return true;
  }

  async delete(idReceta: number, numero: number): Promise<boolean> {
    const existente = await orm.em.findOne(Paso, { receta: idReceta, numero });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }

  // El service nunca manda `numero` al crear, el repository lo calcula
  private async proximoNumero(idReceta: number): Promise<number> {
    const pasos = await orm.em.find(Paso, { receta: idReceta });
    const maximo = pasos.reduce((max, p) => Math.max(max, p.numero), 0);
    return maximo + 1;
  }
}
