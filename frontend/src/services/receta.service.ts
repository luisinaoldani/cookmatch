import { Receta } from "../entities/receta.entity";
import { RecetaMock } from "./mocks/receta.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...RecetaMock];

export const getRecetas = async (): Promise<Receta[]> => {
  await delay(400);
  return data;
};

export const getRecetaByCodigo = async (
  id: number
): Promise<Receta | undefined> => {
  await delay(300);
  return data.find((receta) => receta.id === id);
};

export const createReceta = async (
  newItem: Partial<Receta>
): Promise<Receta> => {
  await delay(300);

  const nextId = Math.max(0, ...data.map((receta) => receta.id ?? 0)) + 1;

  const receta: Receta = {
    id: nextId,
    nombre: "",
    dificultad: "",
    tiempoMin: 0,
    estado: "Borrador",
    etiquetas: [],
    pasos: [],
    utensilios: [],
    ingredientes: [],
    ...newItem,
  };

  data.push(receta);
  return receta;
};

export const updateReceta = async (
  id: number,
  changes: Partial<Receta>
): Promise<Receta | undefined> => {
  await delay(300);

  data = data.map((receta) =>
    receta.id === id ? { ...receta, ...changes, id } : receta
  );

  return data.find((receta) => receta.id === id);
};

export const deleteReceta = async (id: number): Promise<void> => {
  await delay(300);
  data = data.filter((receta) => receta.id !== id);
};