import { orm } from '../db.js';
import { Receta } from './receta.entity.js';
import { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import { Utensilio } from '../utensilio/utensilio.entity.js';
import { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';
import { RecetaIngredienteRepository } from '../receta_ingrediente/receta_ingrediente.repository.js';
import { PasoRepository } from '../paso/paso.repository.js';

const POPULATE = [
  'pasos',
  'ingredientes',
  'ingredientes.ingrediente',
  'etiquetas',
  'utensilios',
  'restricciones',
] as const;

export class RecetaRepository {
  private pasoRepository = new PasoRepository();
  private recetaIngredienteRepository = new RecetaIngredienteRepository();

  async findAll(): Promise<Receta[]> {
    return orm.em.findAll(Receta, { populate: POPULATE });
  }

  async findByEtiquetas(etiquetaIds: number[]): Promise<Receta[]> {
    const qb = orm.em.createQueryBuilder(Receta, 'r');
    const filas = await qb
      .select('r.id')
      .join('r.etiquetas', 'e')
      .where({ 'e.id': { $in: etiquetaIds } })
      .groupBy('r.id')
      .having('count(distinct e.id) = ?', [etiquetaIds.length])
      .execute();

    const ids = filas.map((fila: { id: number }) => fila.id);
    if (ids.length === 0) return [];

    return orm.em.find(Receta, { id: { $in: ids } }, { populate: POPULATE });
  }

  async findByEtiquetasRestricciones(etiquetaIds: number[], restriccionIds: number[]): Promise<Receta[]> {
    const qb = orm.em.createQueryBuilder(Receta, 'r').select('r.id');

    if (etiquetaIds.length > 0) {
      qb.leftJoin('r.etiquetas', 'e')
        .andWhere({ 'e.id': { $in: etiquetaIds } });
    }

    if (restriccionIds.length > 0) {
      qb.leftJoin('r.restricciones', 're')
        .andWhere({ 're.id': { $in: restriccionIds } });
    }

    qb.groupBy('r.id');

    if (etiquetaIds.length > 0) {
      qb.having('count(distinct e.id) >= ?', [1]);
    }

    if (restriccionIds.length > 0) {
      qb.andHaving('count(distinct re.id) = ?', [restriccionIds.length]);
    }

    const filas = await qb.execute();
    const ids = filas.map((fila: { id: number }) => fila.id);

    if (ids.length === 0) return [];

    return orm.em.find(Receta, { id: { $in: ids } }, { populate: POPULATE });
  }

  async findById(id: number): Promise<Receta | null> {
    return orm.em.findOne(Receta, { id }, { populate: POPULATE });
  }

  async findByIds(ids: number[]): Promise<Receta[]> {
    return orm.em.find(Receta, { id: { $in: ids } }, { populate: POPULATE });
  }

  async create(receta: Receta): Promise<Receta> {
    const nueva = orm.em.create(Receta, {
      nombre: receta.nombre,
      dificultad: receta.dificultad,
      tiempoMin: receta.tiempoMin,
      estado: receta.estado,
    });
    this.setRelacionesMN(nueva, receta);
    this.recetaIngredienteRepository.crearVariosSinGuardar(nueva, receta.ingredientesInput ?? []);
    this.pasoRepository.crearVariosSinGuardar(nueva, receta.pasosInput ?? []);
    await orm.em.flush();
    return nueva;
  }

  async update(id: number, receta: Receta): Promise<boolean> {
    const existente = await orm.em.findOne(Receta, { id });
    if (!existente) return false;
    existente.nombre = receta.nombre;
    existente.dificultad = receta.dificultad;
    existente.tiempoMin = receta.tiempoMin;
    existente.estado = receta.estado;
    this.setRelacionesMN(existente, receta);
    if (receta.ingredientesInput) {
      await this.recetaIngredienteRepository.reemplazarSinGuardar(existente, receta.ingredientesInput);
    }
    if (receta.pasosInput) {
      await this.pasoRepository.reemplazarSinGuardar(existente, receta.pasosInput);
    }
    await orm.em.flush();
    return true;
  }

  async delete(id: number): Promise<boolean> {
    const existente = await orm.em.findOne(Receta, { id });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }

  private setRelacionesMN(destino: Receta, origen: Receta): void {
    if (origen.etiquetasInput) {
      destino.etiquetas.set(origen.etiquetasInput.map((e) => orm.em.getReference(Etiqueta, e.id)));
    }
    if (origen.utensiliosInput) {
      destino.utensilios.set(origen.utensiliosInput.map((u) => orm.em.getReference(Utensilio, u.id)));
    }
    if (origen.restriccionesInput) {
      destino.restricciones.set(origen.restriccionesInput.map((r) => orm.em.getReference(RestriccionAlimentaria, r.id)));
    }
  }
}