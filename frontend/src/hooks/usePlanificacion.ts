import { useState, useEffect } from "react";
import { Receta } from "../entities/receta.entity";
import { getRecetas } from "../services/receta.service";
import { generarPlanificacion } from "../services/planificacion.service";
import { DiaPlanificado, DiaInput, ComidasInput } from "../types/planificacion.types";

const DIAS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
const MOMENTOS = ["desayuno", "almuerzo", "merienda", "cena"] as const;

type Asignacion = { dia?: string; momento?: string };
type Asignaciones = Record<number, Asignacion>;

export function usePlanificacion() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loadingRecetas, setLoadingRecetas] = useState(true);
  const [asignaciones, setAsignaciones] = useState<Asignaciones>({});
  const [resultado, setResultado] = useState<DiaPlanificado[] | null>(null);
  const [loadingGenerar, setLoadingGenerar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecetas()
      .then(setRecetas)
      .finally(() => setLoadingRecetas(false));
  }, []);

  const asignar = (recetaId: number, campo: "dia" | "momento", valor: string) => {
    setAsignaciones((prev) => {
      const nuevaAsignacion = { ...prev[recetaId], [campo]: valor };
      const actualizado: Asignaciones = { ...prev, [recetaId]: nuevaAsignacion };

      if (nuevaAsignacion.dia && nuevaAsignacion.momento) {
        for (const [idStr, asign] of Object.entries(actualizado)) {
          const id = Number(idStr);
          if (id === recetaId) continue;
          if (asign.dia === nuevaAsignacion.dia && asign.momento === nuevaAsignacion.momento) {
            actualizado[id] = {};
          }
        }
      }

      return actualizado;
    });
  };

  const calcularFaltantes = (): string[] => {
    const faltantes: string[] = [];
    for (const dia of DIAS) {
      for (const momento of MOMENTOS) {
        const hayAlguna = Object.values(asignaciones).some(
          (a) => a.dia === dia && a.momento === momento
        );
        if (!hayAlguna) faltantes.push(`${dia} - ${momento}`);
      }
    }
    return faltantes;
  };

  const generar = async () => {
    const faltantes = calcularFaltantes();
    if (faltantes.length > 0) {
      setError(`Faltan completar: ${faltantes.join(", ")}`);
      return;
    }

    const dias: DiaInput[] = DIAS.map((dia) => {
      const comidas = {} as ComidasInput;
      for (const momento of MOMENTOS) {
        const entry = Object.entries(asignaciones).find(
          ([, a]) => a.dia === dia && a.momento === momento
        );
        comidas[momento] = Number(entry![0]);
      }
      return { dia, comidas };
    });

    try {
      setLoadingGenerar(true);
      setError(null);
      const data = await generarPlanificacion({ dias });
      setResultado(data);
    } catch (err) {
      setError("Error al generar la planificación");
    } finally {
      setLoadingGenerar(false);
    }
  };

  return { recetas, loadingRecetas, asignaciones, asignar, calcularFaltantes, generar, resultado, loadingGenerar, error };
}