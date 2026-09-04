import api from "./axiosConfig";
import { Receta } from "../entities/receta.entity";

export const getRecetas = async (): Promise<Receta[]> => {
  const res = await api.get("/recetas");
  return res.data;
};

export const getRecetaByCodigo = async (id: number): Promise<Receta> => {
  const res = await api.get(`/recetas/${id}`);
  return res.data;
};

export const createReceta = async (newItem: Partial<Receta>): Promise<Receta> => {
  const res = await api.post("/recetas", newItem);
  return res.data;
};

export const updateReceta = async (id: number, changes: Partial<Receta>): Promise<Receta> => {
  const res = await api.put(`/recetas/${id}`, changes);
  return res.data;
};

export const deleteReceta = async (id: number): Promise<void> => {
  await api.delete(`/recetas/${id}`);
};