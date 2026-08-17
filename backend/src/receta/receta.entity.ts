import type { Paso } from '../paso/paso.entity.js';
import type { RecetaIngrediente } from '../receta_ingrediente/receta_ingrediente.entity.js';
import type { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import type { Utensilio } from '../utensilio/utensilio.entity.js';

// 1. Definimos la interfaz para los parámetros del constructor
export interface RecetaProps {
  id?: number; // El '?' indica que es opcional (ideal para cuando se crea uno nuevo y la BD aún no le asignó ID)
  nombre: string;
  dificultad: string;
  tiempoMin: number;
  estado: string;
  pasos?: Paso[];
  ingredientes?: RecetaIngrediente[];
  etiquetas?: Etiqueta[];
  utensilios?: Utensilio[];
}

export class Receta {
  // 2. Declaramos las propiedades y sus tipos en la clase
  id?: number;
  nombre!: string;
  dificultad!: string;
  tiempoMin!: number;
  estado!: string;
  pasos?: Paso[];
  ingredientes?: RecetaIngrediente[];
  etiquetas?: Etiqueta[];
  utensilios?: Utensilio[];

  // 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ id, nombre, dificultad, tiempoMin, estado, pasos, ingredientes, etiquetas, utensilios }: RecetaProps) {
    this.id = id;
    this.nombre = nombre;
    this.dificultad = dificultad;
    this.tiempoMin = tiempoMin;
    this.estado = estado;
    this.pasos = pasos;
    this.ingredientes = ingredientes;
    this.etiquetas = etiquetas;
    this.utensilios = utensilios;
  }
}