import { orm } from '../db.js';
import { Paso } from './paso.entity.js';
import { Receta } from '../receta/receta.entity.js';
import type { RecetaPasoInput } from '../receta/receta.entity.js';
import { BadRequestError } from '../shared/errors.js';

export class PasoRepository {
  async findAll(idReceta?: number): Promise<Paso[]> {
    const filtro = idReceta !== undefined ? { receta: idReceta } : {};
    return orm.em.find(Paso, filtro, { orderBy: { numero: 'asc' } });
  }

  async findById(idReceta: number, numero: number): Promise<Paso | null> {
    return orm.em.findOne(Paso, { receta: idReceta, numero });
  }

  async create(paso: Paso): Promise<Paso> {
    const idReceta = paso.idReceta;
    if (idReceta === undefined) {
      throw new BadRequestError('El idReceta es obligatorio');
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

  private async proximoNumero(idReceta: number): Promise<number> {
    const pasos = await orm.em.find(Paso, { receta: idReceta });
    const maximo = pasos.reduce((max, p) => Math.max(max, p.numero), 0);
    return maximo + 1;
  }


  crearSinGuardar(receta: Receta, numero: number, descripcion: string): Paso {
    return orm.em.create(Paso, { receta, numero, descripcion });
  }

  crearVariosSinGuardar(receta: Receta, nuevos: RecetaPasoInput[]): void {
    nuevos.forEach((item, indice) => {
      this.crearSinGuardar(receta, indice + 1, item.descripcion);
    });
  }

 
  async reemplazarSinGuardar(receta: Receta, nuevos: RecetaPasoInput[]): Promise<void> {
    await receta.pasos.init();

    const actuales = new Map(receta.pasos.getItems().map((p) => [p.numero, p]));

    nuevos.forEach((item, indice) => {
      const numero = indice + 1;
      const actual = actuales.get(numero);
      if (actual) {
        actual.descripcion = item.descripcion;
        actuales.delete(numero);
      } else {
        this.crearSinGuardar(receta, numero, item.descripcion);
      }
    });

    for (const sobrante of actuales.values()) {
      orm.em.remove(sobrante);
    }
  }
}
