// 1. Definimos la interfaz para los parámetros del constructor
export interface RecetaProps {
  id?: number; // El '?' indica que es opcional (ideal para cuando se crea uno nuevo y la BD aún no le asignó ID)
  nombre: string;
  dificultad: string;
  tiempoMin: string;
  estado: string;
}

export class Receta {
  // 2. Declaramos las propiedades y sus tipos en la clase
  id?: number;
  nombre!: string;
  dificultad!: string;
  tiempoMin!: string;
  estado!: string;

  // 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ id, nombre, dificultad, tiempoMin, estado }: RecetaProps) {
    this.id = id;
    this.nombre = nombre;
    this.dificultad = dificultad;
    this.tiempoMin = tiempoMin;
    this.estado = estado;
  }
}