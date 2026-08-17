import api from "./axiosConfig";
import { Etiqueta } from "../entities/etiqueta.entity";

export const getEtiquetas = async (): Promise<Etiqueta[]> => {
  const res = await api.get("/etiquetas");
  console.log("Respuesta del back:", res.data); // temporal, para ver el formato real
  return res.data.data;
};

export const getEtiquetaById = async (id: number): Promise<Etiqueta> => {
  const res = await api.get(`/etiquetas/${id}`);
  return res.data.data;
};

export const createEtiqueta = async (newItem: Partial<Etiqueta>): Promise<Etiqueta> => {
  const res = await api.post("/etiquetas", newItem);
  return res.data.data;
};

export const updateEtiqueta = async (id: number, changes: Partial<Etiqueta>): Promise<Etiqueta> => {
  const res = await api.put(`/etiquetas/${id}`, changes);
  return res.data.data;
};

export const deleteEtiqueta = async (id: number): Promise<void> => {
  await api.delete(`/etiquetas/${id}`);
};