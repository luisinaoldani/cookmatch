import type { Receta } from '../receta/receta.entity.js';
import type { Etiqueta } from '../etiqueta/etiqueta.entity.js';

export interface RecetaEtiquetaProps {
  receta: Receta;
  etiqueta: Etiqueta;
}

export class RecetaEtiqueta {
  receta!: Receta;
  etiqueta!: Etiqueta;

  constructor({ receta, etiqueta }: RecetaEtiquetaProps) {
    this.receta = receta;
    this.etiqueta = etiqueta;
  } 
}