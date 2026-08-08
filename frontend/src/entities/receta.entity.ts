import { baseEntity } from "./baseEntity";
import { Etiqueta } from "./etiqueta.entity";
import { Paso } from "./paso.entity";
import { Utensilio } from "./utensilio.entity";
import { RecetaIngrediente } from "./receta_ingrediente.entity";
import { Usuario } from "./usuario.entity"

export class Receta extends baseEntity {
  nombre!: string;
  dificultad!: string;
  tiempoMin!: number;
  estado!: string;
  usuarios?: Usuario;
  etiquetas?: Etiqueta[];
  pasos?: Paso[];
  utensilios?: Utensilio[];
  ingredientes?: RecetaIngrediente[];
}