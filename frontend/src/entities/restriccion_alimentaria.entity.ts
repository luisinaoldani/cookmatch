import { baseEntity } from "./baseEntity";
import { TipoRestriccion } from "./tipo_restriccion.entity";

export class RestriccionAlimentaria extends baseEntity {
  nombre!: string;
  descripcion?: string;
  tipoRestriccion!: TipoRestriccion;
}