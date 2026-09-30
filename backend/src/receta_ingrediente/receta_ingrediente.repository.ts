import { orm } from '../db.js';
import { RecetaIngrediente } from './receta_ingrediente.entity.js';
import { Receta } from '../receta/receta.entity.js';
import type { RecetaIngredienteInput } from '../receta/receta.entity.js';
import { Ingrediente } from '../ingrediente/ingrediente.entity.js';

export class RecetaIngredienteRepository {
  async findAll(): Promise<RecetaIngrediente[]> {
    return orm.em.findAll(RecetaIngrediente, { populate: ['ingrediente'] });
  }

  async findById(idReceta: number, idIngrediente: number): Promise<RecetaIngrediente | null> {
    return orm.em.findOne(
      RecetaIngrediente,
      { receta: idReceta, ingrediente: idIngrediente },
      { populate: ['ingrediente'] },
    );
  }

  async create(item: RecetaIngrediente): Promise<RecetaIngrediente> {
    const receta = orm.em.getReference(Receta, item.receta.id);
    const ingrediente = orm.em.getReference(Ingrediente, item.ingrediente.id);
    const nuevo = orm.em.create(RecetaIngrediente, {
      receta,
      ingrediente,
      cantidad: item.cantidad,
      unidadMedida: item.unidadMedida,
    });
    await orm.em.flush();
    return nuevo;
  }

  async update(idReceta: number, idIngrediente: number, item: RecetaIngrediente): Promise<boolean> {
    const existente = await orm.em.findOne(RecetaIngrediente, { receta: idReceta, ingrediente: idIngrediente });
    if (!existente) return false;
    existente.cantidad = item.cantidad;
    existente.unidadMedida = item.unidadMedida;
    await orm.em.flush();
    return true;
  }

  async delete(idReceta: number, idIngrediente: number): Promise<boolean> {
    const existente = await orm.em.findOne(RecetaIngrediente, { receta: idReceta, ingrediente: idIngrediente });
    if (!existente) return false;
    orm.em.remove(existente);
    await orm.em.flush();
    return true;
  }

  // Métodos "sin guardar": preparan los cambios en el EntityManager pero NO
  // hacen flush(). Los usa RecetaRepository para que la receta y sus
  // ingredientes se guarden juntos en una sola transacción. Quien los llama
  // es responsable de hacer el flush().

  crearSinGuardar(receta: Receta, item: RecetaIngredienteInput): RecetaIngrediente {
    return orm.em.create(RecetaIngrediente, {
      receta,
      ingrediente: orm.em.getReference(Ingrediente, item.ingrediente.id),
      cantidad: item.cantidad,
      unidadMedida: item.unidadMedida,
    });
  }

  // Para una receta nueva, que todavía no tiene ingredientes.
  crearVariosSinGuardar(receta: Receta, nuevos: RecetaIngredienteInput[]): void {
    for (const item of nuevos) {
      this.crearSinGuardar(receta, item);
    }
  }

  // Para una receta que ya existe. RecetaIngrediente no es un M:N simple
  // (tiene cantidad y unidadMedida), así que no sirve .set(): se compara la
  // lista actual contra la nueva y se actualizan los que siguen, se crean los
  // nuevos y se borran los que ya no están.
  async reemplazarSinGuardar(receta: Receta, nuevos: RecetaIngredienteInput[]): Promise<void> {
    await receta.ingredientes.init();

    const actuales = new Map(
      receta.ingredientes.getItems().map((ri) => [ri.ingrediente.id, ri]),
    );

    for (const item of nuevos) {
      const actual = actuales.get(item.ingrediente.id);
      if (actual) {
        actual.cantidad = item.cantidad;
        actual.unidadMedida = item.unidadMedida;
        actuales.delete(item.ingrediente.id);
      } else {
        this.crearSinGuardar(receta, item);
      }
    }

    // Los que quedaron en el mapa estaban en la receta pero ya no vienen en el body.
    for (const sobrante of actuales.values()) {
      orm.em.remove(sobrante);
    }
  }
}

