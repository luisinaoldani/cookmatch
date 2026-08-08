// RestriccionAlimentaria tampoco tiene id propio: se identifica por la
// combinación de codigoTipo (a qué TipoRestriccion pertenece) + nombre.
// "descripcion" es opcional porque en la tabla permite NULL.
export interface RestriccionAlimentariaProps {
  codigoTipo: number;
  nombre: string;
  descripcion?: string;
}

export class RestriccionAlimentaria {
  codigoTipo: number;
  nombre: string;
  descripcion?: string;

  constructor({ codigoTipo, nombre, descripcion }: RestriccionAlimentariaProps) {
    this.codigoTipo = codigoTipo;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
