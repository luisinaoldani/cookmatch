import { TipoRestriccion } from "./tipo_restriccion.entity";

export class RestriccionAlimentaria {
  tipoRestriccion!: TipoRestriccion;
  nombre!: string;
  descripcion?: string;
}