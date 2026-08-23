import { Paso } from "../entities/paso.entity";
import { PasoMock } from "./mocks/paso.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data: Record<number, Paso[]> = { ...PasoMock };

export const getPasosByReceta = async (
  recetaId: number
): Promise<Paso[]> => {
  await delay(300);

  return [...(data[recetaId] ?? [])].sort(
    (a, b) => a.numero - b.numero
  );
};

export const getPasoByNumero = async (
  recetaId: number,
  numero: number
): Promise<Paso | undefined> => {
  await delay(300);

  return data[recetaId]?.find((paso) => paso.numero === numero);
};

export const createPaso = async (
  recetaId: number,
  newItem: Partial<Paso>
): Promise<Paso> => {
  await delay(300);

  const pasosDeReceta = data[recetaId] ?? [];

  const nextNumero =
    Math.max(0, ...pasosDeReceta.map((paso) => paso.numero)) + 1;

  const paso: Paso = {
    numero: nextNumero,
    descripcion: newItem.descripcion ?? "",
  };

  data[recetaId] = [...pasosDeReceta, paso];

  return paso;
};

export const updatePaso = async (
  recetaId: number,
  numero: number,
  changes: Partial<Paso>
): Promise<Paso | undefined> => {
  await delay(300);

  if (!data[recetaId]) return undefined;

  data[recetaId] = data[recetaId].map((paso) =>
    paso.numero === numero
      ? { ...paso, ...changes, numero }
      : paso
  );

  return data[recetaId].find((paso) => paso.numero === numero);
};

export const deletePaso = async (
  recetaId: number,
  numero: number
): Promise<void> => {
  await delay(300);

  data[recetaId] = (data[recetaId] ?? []).filter(
    (paso) => paso.numero !== numero
  );
};