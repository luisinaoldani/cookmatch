import { useState, useEffect } from "react";
import { Receta } from "../entities/receta.entity";
import { getRecetas } from "../services/receta.service";
import { generarPlanificacion } from "../services/planificacion.service";
import { DiaPlanificado, DiaInput, ComidasInput } from "../types/planificacion.types";
import ExcelJS from "exceljs";

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

const DIAS_LABEL_CSV: Record<string, string> = {
  lunes: "Lunes", martes: "Martes", miercoles: "Miercoles", jueves: "Jueves",
  viernes: "Viernes", sabado: "Sabado", domingo: "Domingo",
};

const descargarExcel = async () => {
  if (!resultado) return;

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Planificación");

  sheet.columns = [
    { header: "Día", key: "dia", width: 15 },
    { header: "Desayuno", key: "desayuno", width: 22 },
    { header: "Almuerzo", key: "almuerzo", width: 22 },
    { header: "Merienda", key: "merienda", width: 22 },
    { header: "Cena", key: "cena", width: 22 },
  ];

  sheet.getRow(1).font = { bold: true, size: 12, color: { argb: "FFFFFFFF" } };
sheet.getRow(1).fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFD6472B" },
};

  resultado.forEach((dia) => {
    sheet.addRow({
      dia: DIAS_LABEL_CSV[dia.dia] ?? dia.dia,
      desayuno: dia.comidas.desayuno.nombre,
      almuerzo: dia.comidas.almuerzo.nombre,
      merienda: dia.comidas.merienda.nombre,
      cena: dia.comidas.cena.nombre,
    });
  });

  sheet.getColumn("dia").eachCell((cell, rowNumber) => {
  if (rowNumber === 1) return;
  cell.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFFDEBD0" },
  };
  cell.font = { size: 12 };
});

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "planificacion-semanal.xlsx";
  link.click();

  URL.revokeObjectURL(url);
};

  return {
    recetas, loadingRecetas,
    filas, agregarFila, actualizarFila, eliminarFila,
    calcularFaltantes, generar, resultado, loadingGenerar, error, descargarExcel
  };
}