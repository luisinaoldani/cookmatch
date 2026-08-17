import { Ingrediente } from "@/entities/ingrediente.entity";
import { ingredienteMock } from "./mocks/ingrediente.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms)); // simulacion de q tarda en responder

let data = [...ingredienteMock]; // uso copia mutable por si necesito resetear

export const getIngredientes = async (): Promise<Ingrediente[]> => {  // lee todos los ingredientes
  await delay(400);
  return data;
};

export const getIngredienteByid = async (id: number): Promise<Ingrediente | undefined> => { // lee uno por uno, por id
  await delay(300); 
  return data.find((i) => i.id === id);
};

export const createIngrediente = async (newItem: Partial<Ingrediente>): Promise<Ingrediente> => { // crea uno nuevo // partial<> un objeto con algunos o todos los campos de ingrediente
  await delay(300);
  const ingrediente = { ...newItem } as Ingrediente;
  data.push(ingrediente);  // lo agrega al final del arreglo 
  return ingrediente;
};

export const updateIngrediente = async (id: number, changes: Partial<Ingrediente>): Promise<Ingrediente | undefined> => { // poder editarlo
  await delay(300);
  data = data.map((i) => (i.id === id ? { ...i, ...changes } : i)); // si ese es el que busco, devolvé una copia de i pero con los cambios pisando encima, si no, lo deja como esta
  return data.find((i) => i.id === id);
};

export const deleteIngrediente = async (id: number): Promise<void> => { // borrar
  await delay(300);
  data = data.filter((i) => i.id !== id); // se queda con todos los elementos q no cumplan la condición, menos con el q quiero borrar
};