import api from "./axiosConfig";
import { TipoRestriccion } from "../entities/tipo_restriccion.entity";

export const getTiposRestriccion = async (): Promise<TipoRestriccion[]> => {
  const res = await api.get("/tipos-restriccion");
  return res.data;
};

export const getTipoRestriccionById = async (id: number): Promise<TipoRestriccion> => {
  const res = await api.get(`/tipos-restriccion/${id}`);
  return res.data;
};

export const createTipoRestriccion = async (newItem: Partial<TipoRestriccion>): Promise<TipoRestriccion> => {
  const res = await api.post("/tipos-restriccion", newItem);
  return res.data;
};

export const updateTipoRestriccion = async (id: number, changes: Partial<TipoRestriccion>): Promise<TipoRestriccion> => {
  const res = await api.put(`/tipos-restriccion/${id}`, changes);
  return res.data;
};

export const deleteTipoRestriccion = async (id: number): Promise<void> => {
  await api.delete(`/tipos-restriccion/${id}`);
};