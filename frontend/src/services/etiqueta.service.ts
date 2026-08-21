import { Etiqueta } from "../entities/etiqueta.entity";
import { etiquetaMock } from "./mocks/etiqueta.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...etiquetaMock];

export const getEtiquetas = async (): Promise<Etiqueta[]> => {
  await delay(400);
  return data;
};

export const getEtiquetaById = async (id: number): Promise<Etiqueta | undefined> => {
  await delay(300);
  return data.find((e) => e.id === id);
};

export const createEtiqueta = async (newItem: Partial<Etiqueta>): Promise<Etiqueta> => {
  await delay(300);
  const nuevoId = Math.max(0, ...data.map((e) => e.id ?? 0)) + 1;
  const etiqueta = { ...newItem, id: nuevoId } as Etiqueta;
  data.push(etiqueta);
  return etiqueta;
};

export const updateEtiqueta = async (id: number, changes: Partial<Etiqueta>): Promise<Etiqueta | undefined> => {
  await delay(300);
  data = data.map((e) => (e.id === id ? { ...e, ...changes } : e));
  return data.find((e) => e.id === id);
};

export const deleteEtiqueta = async (id: number): Promise<void> => {
  await delay(300);
  data = data.filter((e) => e.id !== id);
};