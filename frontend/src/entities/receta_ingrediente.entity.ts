import { Ingrediente } from "./ingrediente.entity";

export class RecetaIngrediente {
  cantidad!: number;
  unidadMedida!: string;
  ingrediente!: Ingrediente;
}