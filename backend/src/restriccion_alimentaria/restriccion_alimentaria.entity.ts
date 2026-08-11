import type { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';

export interface RestriccionAlimentariaProps {
  tipoRestriccion: TipoRestriccion;
  nombre: string;
  descripcion?: string;
}

export class RestriccionAlimentaria {
  tipoRestriccion!: TipoRestriccion;
  nombre!: string;
  descripcion?: string;

  constructor({ tipoRestriccion, nombre, descripcion }: RestriccionAlimentariaProps) {
    this.tipoRestriccion = tipoRestriccion;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
