// 1. Definimos la interfaz para los parámetros del constructor
export interface PasoProps {
  idReceta?: number;
  numero?: number;
  descripcion: string;
}

export class Paso {
 // 2. Declaramos las propiedades y sus tipos en la clase
  idReceta?: number;
  numero?: number;
  descripcion!: string;

  // 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ idReceta, numero, descripcion }: PasoProps) {
    this.idReceta = idReceta;
    this.numero = numero;
    this.descripcion = descripcion;
  }
}