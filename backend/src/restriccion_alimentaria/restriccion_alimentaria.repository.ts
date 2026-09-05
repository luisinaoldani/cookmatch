import { orm } from '../db.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';
import { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';

export class RestriccionAlimentariaRepository {
  async findAll(): Promise<RestriccionAlimentaria[]> {
    return orm.em.findAll(RestriccionAlimentaria, { populate: ['tipoRestriccion'] });
  }

  async findById(id: number): Promise<RestriccionAlimentaria | null> {
    return orm.em.findOne(RestriccionAlimentaria, { id }, { populate: ['tipoRestriccion'] });
  }

  async create(restriccion: RestriccionAlimentaria): Promise<RestriccionAlimentaria> {
    // El body solo trae { tipoRestriccion: { id: X }, ... }; getReference()
    // arma una referencia liviana sin ir a buscar la fila completa. Si el
    // id no existe, el error aparece recién al hacer flush() (viola la FK).
    const tipoRestriccion = orm.em.getReference(TipoRestriccion, restriccion.tipoRestriccion.id);
    const nueva = orm.em.create(RestriccionAlimentaria, {
      tipoRestriccion,
      nombre: restriccion.nombre,
      descripcion: restriccion.descripcion,
    });
    await orm.em.flush();
    return nueva;
  }

  async update(id: number, restriccion: RestriccionAlimentaria): Promise<boolean> {
    const existente = await orm.em.findOne(RestriccionAlimentaria, { id });
    if (!existente) return false;
    existente.tipoRestriccion = orm.em.getReference(TipoRestriccion, restriccion.tipoRestriccion.id);
    existente.nombre = restriccion.nombre;
    existente.descripcion = restriccion.descripcion;
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(RestriccionAlimentaria, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}

