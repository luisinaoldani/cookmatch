export class Receta {
  constructor({ id, titulo, descripcion, tiempoCoccion, instrucciones }) {
    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.tiempoCoccion = tiempoCoccion;
    this.instrucciones = instrucciones;
  }
}