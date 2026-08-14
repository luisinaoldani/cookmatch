import api from "./axiosConfig";
import { Etiqueta } from "../entities/etiqueta.entity";

export const getEtiquetas = async (): Promise<Etiqueta[]> => {
  const res = await api.get("/etiquetas");
  console.log("Respuesta del back:", res.data); // temporal, para ver el formato real
  return res.data.data;
};

export const getEtiquetaByCodigo = async (codigo: string): Promise<Etiqueta> => {
  const res = await api.get(`/etiquetas/${codigo}`);
  return res.data.data;
};

export const createEtiqueta = async (newItem: Partial<Etiqueta>): Promise<Etiqueta> => {
  const res = await api.post("/etiquetas", newItem);
  return res.data.data;
};

export const updateEtiqueta = async (codigo: string, changes: Partial<Etiqueta>): Promise<Etiqueta> => {
  const res = await api.put(`/etiquetas/${codigo}`, changes);
  return res.data.data;
};

export const deleteEtiqueta = async (codigo: string): Promise<void> => {
  await api.delete(`/etiquetas/${codigo}`);
};