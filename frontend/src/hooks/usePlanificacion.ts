import { useState, useEffect } from "react";
import { Receta } from "../entities/receta.entity";
import { getRecetas } from "../services/receta.service";
import { generarPlanificacion } from "../services/planificacion.service";
import { DiaPlanificado, DiaInput, ComidasInput } from "../types/planificacion.types";

const DIAS = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];
const MOMENTOS = ["desayuno", "almuerzo", "merienda", "cena"] as const;

export type Fila = {
  id: string;
  recetaId?: number;
  dia?: string;
  momento?: string;
};

export function usePlanificacion() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loadingRecetas, setLoadingRecetas] = useState(true);
  const [filas, setFilas] = useState<Fila[]>([]);
  const [resultado, setResultado] = useState<DiaPlanificado[] | null>(null);
  const [loadingGenerar, setLoadingGenerar] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getRecetas()
      .then(setRecetas)
      .finally(() => setLoadingRecetas(false));
  }, []);

  const agregarFila = () => {
    setFilas((prev) => [...prev, { id: crypto.randomUUID() }]);
  };

  const eliminarFila = (filaId: string) => {
    setFilas((prev) => prev.filter((f) => f.id !== filaId));
  };

  const actualizarFila = (filaId: string, campo: "recetaId" | "dia" | "momento", valor: string | number) => {
    setFilas((prev) => {
      let actualizado = prev.map((f) => (f.id === filaId ? { ...f, [campo]: valor } : f));

      const filaActual = actualizado.find((f) => f.id === filaId)!;
      if (filaActual.dia && filaActual.momento) {
        actualizado = actualizado.map((f) =>
          f.id !== filaId && f.dia === filaActual.dia && f.momento === filaActual.momento
            ? { ...f, dia: undefined, momento: undefined }
            : f
        );
      }

      return actualizado;
    });
  };

  const calcularFaltantes = (): string[] => {
    const faltantes: string[] = [];
    for (const dia of DIAS) {
      for (const momento of MOMENTOS) {
        const hayAlguna = filas.some((f) => f.dia === dia && f.momento === momento && f.recetaId);
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
        const fila = filas.find((f) => f.dia === dia && f.momento === momento);
        comidas[momento] = fila!.recetaId!;
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

  return {
    recetas, loadingRecetas,
    filas, agregarFila, actualizarFila, eliminarFila,
    calcularFaltantes, generar, resultado, loadingGenerar, error,
  };
}