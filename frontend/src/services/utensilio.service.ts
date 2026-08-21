import { Utensilio } from "../entities/utensilio.entity";
import { UtensilioMock } from "./mocks/utensilio.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...UtensilioMock];

export const getUtensilios = async (): Promise<Utensilio[]> => {
  await delay(400);
  return data;
};

export const getUtensilioById = async (
  id: number
): Promise<Utensilio | undefined> => {
  await delay(300);
  return data.find((u) => u.id === id);
};

export const createUtensilio = async (
  newItem: Partial<Utensilio>
): Promise<Utensilio> => {
  await delay(300);

  const utensilio = {
    ...newItem,
  } as Utensilio;

  data.push(utensilio);
  return utensilio;
};

export const updateUtensilio = async (
  id: number,
  changes: Partial<Utensilio>
): Promise<Utensilio | undefined> => {
  await delay(300);

  data = data.map((u) => (u.id === id ? { ...u, ...changes } : u));

  return data.find((u) => u.id === id);
};

export const deleteUtensilio = async (id: number): Promise<void> => {
  await delay(300);
  data = data.filter((u) => u.id !== id);
};