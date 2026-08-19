import { orm } from '../db.js';
import { Receta } from './receta.entity.js';
import { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import { Utensilio } from '../utensilio/utensilio.entity.js';

// Acá se devuelve la receta completa -pasos, ingredientes con su Ingrediente, etiquetas y utensilios- 
// porque es lo que necesita el detalle de una receta.
const POPULATE = ['pasos', 'ingredientes', 'ingredientes.ingrediente', 'etiquetas', 'utensilios'] as const;

export class RecetaRepository {
  async findAll(): Promise<Receta[]> {
    return orm.em.findAll(Receta, { populate: POPULATE });
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
    this.setEtiquetasYUtensilios(nueva, receta);
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
    this.setEtiquetasYUtensilios(existente, receta);
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
  // falta en receta_etiqueta / receta_utensilio, no borra y recrea todo.
  private setEtiquetasYUtensilios(destino: Receta, origen: Receta): void {
    if (origen.etiquetasInput) {
      destino.etiquetas.set(origen.etiquetasInput.map((e) => orm.em.getReference(Etiqueta, e.id)));
    }
    if (origen.utensiliosInput) {
      destino.utensilios.set(origen.utensiliosInput.map((u) => orm.em.getReference(Utensilio, u.id)));
    }
  }
}