import { orm } from '../shared/database/db.js';
import { TipoRestriccion } from './tipo_restriccion.entity.js';

export class TipoRestriccionRepository {
  async findAll(): Promise<TipoRestriccion[]> {
    return orm.em.findAll(TipoRestriccion, { populate: ['restricciones'] });
  }

  async findById(id: number): Promise<TipoRestriccion | null> {
    return orm.em.findOne(TipoRestriccion, { id }, { populate: ['restricciones'] });
  }

  async create(tipoRestriccion: TipoRestriccion): Promise<TipoRestriccion> {
    const nuevo = orm.em.create(TipoRestriccion, { tipo: tipoRestriccion.tipo });
    await orm.em.flush();
    return nuevo;
  }

  async update(id: number, tipoRestriccion: TipoRestriccion): Promise<boolean> {
    const existente = await orm.em.findOne(TipoRestriccion, { id });
    if (!existente) return false;
    existente.tipo = tipoRestriccion.tipo;
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(TipoRestriccion, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}
