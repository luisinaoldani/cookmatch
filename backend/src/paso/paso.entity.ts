// 1. Definimos la interfaz para los parámetros del constructor
export interface PasoProps {
  numero: number;
  descripcion: string;
}

export class Paso {
 // 2. Declaramos las propiedades y sus tipos en la clase
  numero: number;
  descripcion: string;

  // 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ numero, descripcion }: PasoProps) {
    this.numero = numero;
    this.descripcion = descripcion;
  }
}