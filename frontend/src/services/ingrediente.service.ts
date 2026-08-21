import { Ingrediente } from "../entities/ingrediente.entity";
import { IngredienteMock } from "./mocks/ingrediente.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms)); // simulacion de q tarda en responder

let data = [...IngredienteMock]; // uso copia mutable por si necesito resetear

export const getIngredientes = async (): Promise<Ingrediente[]> => {  // lee todos los ingredientes
  await delay(400);
  return data;
};

export const getIngredienteByCodigo = async (id: number): Promise<Ingrediente | undefined> => { // lee uno por su id
  await delay(300);
  return data.find((i) => i.id === id);
};

export const createIngrediente = async (newItem: Partial<Ingrediente>): Promise<Ingrediente> => { // crea uno nuevo
  await delay(300);
  const nextId = Math.max(0, ...data.map((i) => i.id ?? 0)) + 1;
  const ingrediente = { ...newItem, id: nextId } as Ingrediente;
  data.push(ingrediente);
  return ingrediente;
};

export const updateIngrediente = async (id: number, changes: Partial<Ingrediente>): Promise<Ingrediente | undefined> => { // poder editarlo
  await delay(300);
  data = data.map((i) => (i.id === id ? { ...i, ...changes } : i));
  return data.find((i) => i.id === id);
};

export const deleteIngrediente = async (id: number): Promise<void> => { // borrar
  await delay(300);
  data = data.filter((i) => i.id !== id);
};