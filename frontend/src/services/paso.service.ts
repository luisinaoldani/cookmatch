import api from "./axiosConfig";
import { Paso } from "../entities/paso.entity";

export const getPasosByReceta = async (recetaId: number): Promise<Paso[]> => {
  const res = await api.get(`/pasos?idReceta=${recetaId}`); // confirmar con el back si filtra por query param
  return res.data;
};

export const createPaso = async (recetaId: number, newItem: Partial<Paso>): Promise<Paso> => {
  const res = await api.post("/pasos", { ...newItem, idReceta: recetaId });
  return res.data;
};

export const updatePaso = async (recetaId: number, numero: number, changes: Partial<Paso>): Promise<Paso> => {
  const res = await api.put(`/pasos/${recetaId}/${numero}`, changes);
  return res.data;
};

export const deletePaso = async (recetaId: number, numero: number): Promise<void> => {
  await api.delete(`/pasos/${recetaId}/${numero}`);
};