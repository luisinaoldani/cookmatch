import { RestriccionAlimentaria } from "../../entities/restriccion_alimentaria.entity";
import { tiposRestriccionMock } from "./tipo_restriccion.mock";

export const restriccionesAlimentariasMock: RestriccionAlimentaria[] = [
  { tipoRestriccion: tiposRestriccionMock[1], nombre: "Sin gluten", descripcion: "Evitar trigo, cebada y centeno" },
  { tipoRestriccion: tiposRestriccionMock[2], nombre: "Sin lactosa", descripcion: "Evitar leche y derivados" },
  { tipoRestriccion: tiposRestriccionMock[3], nombre: "Control de azúcar", descripcion: "Apto para diabéticos" },
];