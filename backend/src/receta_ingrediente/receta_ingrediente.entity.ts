// RecetaIngrediente es una entidad "dependiente": no tiene un id propio,
// sino que se identifica por la combinación de idReceta + codIngrediente
// (así está definida la clave primaria compuesta en la tabla).
export interface RecetaIngredienteProps {
  idReceta: number;
  codIngrediente: number;
  cantidad: number;
  unidadMedida: string;
}

export class RecetaIngrediente {
  idReceta: number;
  codIngrediente: number;
  cantidad: number;
  unidadMedida: string;

  constructor({ idReceta, codIngrediente, cantidad, unidadMedida }: RecetaIngredienteProps) {
    this.idReceta = idReceta;
    this.codIngrediente = codIngrediente;
    this.cantidad = cantidad;
    this.unidadMedida = unidadMedida;
  }
}
