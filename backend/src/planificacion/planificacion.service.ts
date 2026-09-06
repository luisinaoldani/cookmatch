import { RecetaRepository } from '../receta/receta.repository.js';
import type { PlanificacionInput } from './planificacion.schema.js';
import type { RecetaResumen, DiaPlanificado } from './planificacion.types.js';
import { BadRequestError } from '../shared/errors.js';

const recetaRepository = new RecetaRepository();

export class PlanificacionService {
  async generar(data: PlanificacionInput): Promise<DiaPlanificado[]> {
    const idsConRepetidos = data.dias.flatMap((d) => [
      d.comidas.desayuno,
      d.comidas.almuerzo,
      d.comidas.merienda,
      d.comidas.cena,
    ]);

    // Set es una colección de JS que no permite duplicados. Si le pasás un array, arma la versión 
    // "sin repetidos"  pero el resultado es un Set, no un array.
    // El operador ... (spread) toma los elementos de un iterable y los vuelca en un array nuevo.
    const idsUnicos = [...new Set(idsConRepetidos)];

    const recetas = await recetaRepository.findByIds(idsUnicos);
    const porId = new Map(recetas.map((r) => [r.id, r]));

    const idsFaltantes = idsUnicos.filter((id) => !porId.has(id));
    if (idsFaltantes.length > 0) {
      throw new BadRequestError(
        `Las siguientes recetas no existen: ${idsFaltantes.join(', ')}`,
      );
    }

    const resumen = (id: number): RecetaResumen => {
      const r = porId.get(id)!;
      return { id: r.id, nombre: r.nombre, dificultad: r.dificultad, tiempoMin: r.tiempoMin };
    };

    return data.dias.map((d) => ({
      dia: d.dia,
      comidas: {
        desayuno: resumen(d.comidas.desayuno),
        almuerzo: resumen(d.comidas.almuerzo),
        merienda: resumen(d.comidas.merienda),
        cena: resumen(d.comidas.cena),
      },
    }));
  }
}