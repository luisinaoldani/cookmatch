import { orm } from '../shared/database/db.js';
import { RestriccionAlimentaria } from './restriccion_alimentaria.entity.js';
import { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';

export class RestriccionAlimentariaRepository {
  async findAll(): Promise<RestriccionAlimentaria[]> {
    return orm.em.findAll(RestriccionAlimentaria, { populate: ['tipoRestriccion'] });
  }

  async findById(idTipoRestriccion: number, nombre: string): Promise<RestriccionAlimentaria | null> {
    return orm.em.findOne(RestriccionAlimentaria, { tipoRestriccion: { id: idTipoRestriccion }, nombre }, { populate: ['tipoRestriccion'] });
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

  async update(idTipoRestriccion: number, nombre: string, restriccion: RestriccionAlimentaria): Promise<boolean> {
    const existente = await orm.em.findOne(RestriccionAlimentaria, { tipoRestriccion: { id: idTipoRestriccion }, nombre });
    if (!existente) return false;
    existente.tipoRestriccion = orm.em.getReference(TipoRestriccion, restriccion.tipoRestriccion.id);
    existente.nombre = restriccion.nombre;
    existente.descripcion = restriccion.descripcion;
    await orm.em.flush();
    return true;
  }

  async delete(idTipoRestriccion: number, nombre: string): Promise<boolean> {
    const existente = await orm.em.findOne(RestriccionAlimentaria, { tipoRestriccion: { id: idTipoRestriccion }, nombre });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }
}

