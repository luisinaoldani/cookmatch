import { orm } from '../db.js';
import { Receta } from './receta.entity.js';
import { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import { Utensilio } from '../utensilio/utensilio.entity.js';
import { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';

// Acá se devuelve la receta completa: pasos, ingredientes con su Ingrediente, etiquetas, utensilios
// y restricciones que cumple, porque es lo que se muestra en el detalle.
const POPULATE = [
  'pasos',
  'ingredientes',
  'ingredientes.ingrediente',
  'etiquetas',
  'utensilios',
  'restricciones',
] as const;

export class RecetaRepository {
  async findAll(): Promise<Receta[]> {
    return orm.em.findAll(Receta, { populate: POPULATE });
  }

  // Es un AND: la receta tiene que tener TODAS las etiquetas pedidas.
  async findByEtiquetas(etiquetaIds: number[]): Promise<Receta[]> {
    // Paso 1: traer los ids de recetas que matchean las N etiquetas. 
    // Agrupamos por receta y pedimos que la cantidad de etiquetas DISTINTAS que
    // matchearon sea igual a la cantidad pedida (el largo del arreglo) 
    // — si le falta una, el conteo da menos y la receta queda afuera.
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

    // Paso 2: con los ids ya filtrados, traer la receta completa con el
    // mismo populate que el detalle.
    return orm.em.find(Receta, { id: { $in: ids } }, { populate: POPULATE });
  }

  // Es un AND y un OR: la receta tiene que tener TODAS las restricciones pedidas 
  // y al menos una de las etiquetas pedidas.
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

  async create(receta: Receta): Promise<Receta> {
    const nueva = orm.em.create(Receta, {
      nombre: receta.nombre,
      dificultad: receta.dificultad,
      tiempoMin: receta.tiempoMin,
      estado: receta.estado,
    });
    this.setRelacionesMN(nueva, receta);
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

  // .set() reemplaza el contenido completo de la colección M:N por las
  // referencias nuevas; el ORM calcula solo los INSERT/DELETE que hacen
  // falta en cada tabla intermedia, no borra y recrea todo.
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