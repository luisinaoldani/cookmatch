// 1. Definimos la interfaz para los parámetros del constructor
export interface UtensilioProps {
  id?: number; // El '?' indica que es opcional (ideal para cuando se crea uno nuevo y la BD aún no le asignó ID)
  nombre: string;
}

export class Utensilio {
  // 2. Declaramos las propiedades y sus tipos en la clase
  id?: number;
  nombre!: string;

  // 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ id, nombre }: UtensilioProps) {
    this.id = id;
    this.nombre = nombre;
  }
}