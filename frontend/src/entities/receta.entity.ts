// src/entities/receta.entity.ts
import { baseEntity } from "./baseEntity";
import { Etiqueta } from "./etiqueta.entity";
import { Paso } from "./paso.entity";
import { Utensilio } from "./utensilio.entity";
import { RecetaIngrediente } from "./recetaIngrediente.entity";

export class Receta extends baseEntity {
  nombre!: string;
  dificultad!: string;
  tiempoMin!: number;
  estado!: string;
  etiquetas: Etiqueta[] = [];
  pasos: Paso[] = [];
  utensilios: Utensilio[] = [];
  ingredientes: RecetaIngrediente[] = [];
}