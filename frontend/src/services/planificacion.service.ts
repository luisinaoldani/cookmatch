import api from "./axiosConfig";
import { PlanificacionInput, DiaPlanificado } from "../types/planificacion.types";

export const generarPlanificacion = async (input: PlanificacionInput): Promise<DiaPlanificado[]> => {
  const res = await api.post("/planificacion/generar", input);
  return res.data;
};