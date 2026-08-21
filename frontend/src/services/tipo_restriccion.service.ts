import { TipoRestriccion } from "../entities/tipo_restriccion.entity";
import { tiposRestriccionMock } from "./mocks/tipo_restriccion.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...tiposRestriccionMock];

export const getTiposRestriccion = async (): Promise<TipoRestriccion[]> => {
  await delay(400);
  return data;
};

export const getTipoRestriccionById = async (id: number): Promise<TipoRestriccion | undefined> => {
  await delay(300);
  return data.find((t) => t.id === id);
};

export const createTipoRestriccion = async (newItem: Partial<TipoRestriccion>): Promise<TipoRestriccion> => {
  await delay(300);
  const nuevoId = Math.max(0, ...data.map((t) => t.id ?? 0)) + 1;
  const tipoRestriccion = { ...newItem, id: nuevoId } as TipoRestriccion;
  data.push(tipoRestriccion);
  return tipoRestriccion;
};

export const updateTipoRestriccion = async (id: number, changes: Partial<TipoRestriccion>): Promise<TipoRestriccion | undefined> => {
  await delay(300);
  data = data.map((t) => (t.id === id ? { ...t, ...changes } : t));
  return data.find((t) => t.id === id);
};

export const deleteTipoRestriccion = async (id: number): Promise<void> => {
  await delay(300);
  data = data.filter((t) => t.id !== id);
};