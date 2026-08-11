import type { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';

export interface TipoRestriccionProps {
  id?: number;
  tipo: string;
  restricciones?: RestriccionAlimentaria[];
}

export class TipoRestriccion {
  id?: number;
  tipo!: string;
  restricciones!: RestriccionAlimentaria[];

  constructor({ id, tipo, restricciones }: TipoRestriccionProps) {
    this.id = id;
    this.tipo = tipo;
    this.restricciones = restricciones ?? [];
  }
}