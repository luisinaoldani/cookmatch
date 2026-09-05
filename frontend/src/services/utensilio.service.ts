import api from "./axiosConfig";
import { Utensilio } from "../entities/utensilio.entity";

export const getUtensilios = async (): Promise<Utensilio[]> => {
  const res = await api.get("/utensilios");
  return res.data;
};

export const getUtensilioById = async (id: number): Promise<Utensilio> => {
  const res = await api.get(`/utensilios/${id}`);
  return res.data;
};

export const createUtensilio = async (newItem: Partial<Utensilio>): Promise<Utensilio> => {
  const res = await api.post("/utensilios", newItem);
  return res.data;
};

export const updateUtensilio = async (id: number, changes: Partial<Utensilio>): Promise<Utensilio> => {
  const res = await api.put(`/utensilios/${id}`, changes);
  return res.data;
};

export const deleteUtensilio = async (id: number): Promise<void> => {
  await api.delete(`/utensilios/${id}`);
};