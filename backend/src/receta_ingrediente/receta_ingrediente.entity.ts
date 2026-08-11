import type { Ingrediente } from '../ingrediente/ingrediente.entity.js';

// RecetaIngrediente es la tabla intermedia entre Receta e Ingrediente.
// Guardamos el Ingrediente COMPLETO (no solo su código) porque cuando se
// muestra el detalle de una receta se necesita el nombre del ingrediente,
// no solo su id. idReceta se deja como número (no como objeto Receta
// completo) para evitar una referencia circular entre las dos entidades.
export interface RecetaIngredienteProps {
  idReceta: number;
  ingrediente: Ingrediente;
  cantidad: number;
  unidadMedida: string;
}

export class RecetaIngrediente {
  idReceta!: number;
  ingrediente!: Ingrediente;
  cantidad!: number;
  unidadMedida!: string;

  constructor({ idReceta, ingrediente, cantidad, unidadMedida }: RecetaIngredienteProps) {
    this.idReceta = idReceta;
    this.ingrediente = ingrediente;
    this.cantidad = cantidad;
    this.unidadMedida = unidadMedida;
  }
}