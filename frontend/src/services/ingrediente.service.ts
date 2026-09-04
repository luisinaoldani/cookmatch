import api from "./axiosConfig";
import { Ingrediente } from "../entities/ingrediente.entity";

export const getIngredientes = async (): Promise<Ingrediente[]> => {
  const res = await api.get("/ingredientes");
  return res.data;
};

export const getIngredienteByCodigo = async (id: number): Promise<Ingrediente> => {
  const res = await api.get(`/ingredientes/${id}`);
  return res.data;
};

export const createIngrediente = async (newItem: Partial<Ingrediente>): Promise<Ingrediente> => {
  const res = await api.post("/ingredientes", newItem);
  return res.data;
};

export const updateIngrediente = async (id: number, changes: Partial<Ingrediente>): Promise<Ingrediente> => {
  const res = await api.put(`/ingredientes/${id}`, changes);
  return res.data;
};

export const deleteIngrediente = async (id: number): Promise<void> => {
  await api.delete(`/ingredientes/${id}`);
};