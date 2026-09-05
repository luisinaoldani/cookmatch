import api from "./axiosConfig";
import { RestriccionAlimentaria } from "../entities/restriccion_alimentaria.entity";

export const getRestriccionesAlimentarias = async (): Promise<RestriccionAlimentaria[]> => {
  const res = await api.get("/restricciones-alimentarias");
  return res.data;
};

export const getRestriccionAlimentariaById = async (id: number): Promise<RestriccionAlimentaria> => {
  const res = await api.get(`/restricciones-alimentarias/${id}`);
  return res.data;
};

export const createRestriccionAlimentaria = async (newItem: Partial<RestriccionAlimentaria>): Promise<RestriccionAlimentaria> => {
  const res = await api.post("/restricciones-alimentarias", newItem);
  return res.data;
};

export const updateRestriccionAlimentaria = async (id: number, changes: Partial<RestriccionAlimentaria>): Promise<RestriccionAlimentaria> => {
  const res = await api.put(`/restricciones-alimentarias/${id}`, changes);
  return res.data;
};

export const deleteRestriccionAlimentaria = async (id: number): Promise<void> => {
  await api.delete(`/restricciones-alimentarias/${id}`);
};