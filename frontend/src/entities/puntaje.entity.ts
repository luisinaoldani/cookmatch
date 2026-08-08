import { Usuario } from "./usuario.entity";
import { Receta } from "./receta.entity";

export class Puntaje {
  valor!: number;
  usuario!: Usuario;
  receta!: Receta;
}