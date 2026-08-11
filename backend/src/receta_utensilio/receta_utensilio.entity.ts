import type { Receta } from '../receta/receta.entity.js';
import type { Utensilio } from '../utensilio/utensilio.entity.js';

export interface RecetaUtensilioProps {
  receta: Receta;
  utensilio: Utensilio;
}

export class RecetaUtensilio {
  receta!: Receta;
  utensilio!: Utensilio;

  constructor({ receta, utensilio }: RecetaUtensilioProps) {
    this.receta = receta;
    this.utensilio = utensilio;
  }
}
