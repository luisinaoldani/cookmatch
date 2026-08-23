import { RestriccionAlimentaria } from "../entities/restriccion_alimentaria.entity";
import { restriccionesAlimentariasMock } from "./mocks/restriccion_alimentaria.mock";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

let data = [...restriccionesAlimentariasMock];

export const getRestriccionesAlimentarias = async (): Promise<RestriccionAlimentaria[]> => {
  await delay(400);
  return data;
};

// identificador compuesto: idTipoRestriccion + nombre
export const getRestriccionAlimentaria = async (idTipo: number, nombre: string): Promise<RestriccionAlimentaria | undefined> => {
  await delay(300);
  return data.find((r) => r.tipoRestriccion.id === idTipo && r.nombre === nombre);
};

export const createRestriccionAlimentaria = async (newItem: RestriccionAlimentaria): Promise<RestriccionAlimentaria> => {
  await delay(300);
  data.push(newItem);
  return newItem;
};

export const updateRestriccionAlimentaria = async (idTipo: number, nombre: string, changes: Partial<RestriccionAlimentaria>): Promise<RestriccionAlimentaria | undefined> => {
  await delay(300);
  data = data.map((r) =>
    r.tipoRestriccion.id === idTipo && r.nombre === nombre ? { ...r, ...changes } : r
  );
  return data.find((r) => r.tipoRestriccion.id === idTipo && r.nombre === nombre);
};

export const deleteRestriccionAlimentaria = async (idTipo: number, nombre: string): Promise<void> => {
  await delay(300);
  data = data.filter((r) => !(r.tipoRestriccion.id === idTipo && r.nombre === nombre));
};