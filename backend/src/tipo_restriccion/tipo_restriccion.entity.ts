// 1. Definimos la interfaz para los parámetros del constructor
export interface TipoRestriccionProps {
  id?: number;
  tipo: string;
}

export class TipoRestriccion {
// 2. Declaramos las propiedades y sus tipos en la clase
  id?: number;
  tipo!: string;
  
// 3. Asignamos la interfaz al objeto destructurado del constructor
  constructor({ id, tipo }: TipoRestriccionProps) {
    this.id = id;
    this.tipo = tipo;
  }
}