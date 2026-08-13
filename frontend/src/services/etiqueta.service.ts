import { Etiqueta } from "../entities/etiqueta.entity";
import { etiquetaMock } from "./mocks/etiqueta.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...etiquetaMock];

export const getEtiquetas = async (): Promise<Etiqueta[]> => {
  await delay(400);
  return data;
};

export const getEtiquetaByCodigo = async (codigo: string): Promise<Etiqueta | undefined> => {
  await delay(300);
  return data.find((e) => e.codigo === codigo);
};

export const createEtiqueta = async (newItem: Partial<Etiqueta>): Promise<Etiqueta> => {
  await delay(300);
  const etiqueta = { ...newItem } as Etiqueta;
  data.push(etiqueta);
  return etiqueta;
};

export const updateEtiqueta = async (codigo: string, changes: Partial<Etiqueta>): Promise<Etiqueta | undefined> => {
  await delay(300);
  data = data.map((e) => (e.codigo === codigo ? { ...e, ...changes } : e));
  return data.find((e) => e.codigo === codigo);
};

export const deleteEtiqueta = async (codigo: string): Promise<void> => {
  await delay(300);
  data = data.filter((e) => e.codigo !== codigo);
};