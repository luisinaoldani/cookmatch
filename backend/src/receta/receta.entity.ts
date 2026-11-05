import { Entity, PrimaryKey, Property, OneToMany, ManyToMany } from '@mikro-orm/decorators/es';
import { Collection } from '@mikro-orm/core';
import type { Paso } from '../paso/paso.entity.js';
import type { RecetaIngrediente } from '../receta_ingrediente/receta_ingrediente.entity.js';
import type { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import type { Utensilio } from '../utensilio/utensilio.entity.js';
import type { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';

export interface RecetaIngredienteInput {
  ingrediente: { id: number };
  cantidad: number;
  unidadMedida: string;
}
export interface RecetaPasoInput {
  descripcion: string;
}

export interface RecetaProps {
  nombre: string;
  dificultad: string;
  tiempoMin: number;
  estado: string;
  pasos?: RecetaPasoInput[];
  ingredientes?: RecetaIngredienteInput[];
  etiquetas?: { id: number }[];
  utensilios?: { id: number }[];
  restricciones?: { id: number }[];
}

@Entity()
export class Receta {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  nombre!: string;

  @Property({ length: 100 })
  dificultad!: string;

  @Property({ columnType: 'double unsigned' })
  tiempoMin!: number;

  @Property({ length: 100 })
  estado!: string;

  @OneToMany({ mappedBy: 'receta', orderBy: { numero: 'asc' } })
  pasos = new Collection<Paso>(this);

  @OneToMany({ mappedBy: 'receta' })
  ingredientes = new Collection<RecetaIngrediente>(this);

  @ManyToMany()
  etiquetas = new Collection<Etiqueta>(this);

  @ManyToMany()
  utensilios = new Collection<Utensilio>(this);

  @ManyToMany()
  restricciones = new Collection<RestriccionAlimentaria>(this);

  etiquetasInput?: { id: number }[];
  utensiliosInput?: { id: number }[];
  restriccionesInput?: { id: number }[];
  ingredientesInput?: RecetaIngredienteInput[];
  pasosInput?: RecetaPasoInput[];

  constructor(props?: RecetaProps) {
    if (props) {
      this.nombre = props.nombre;
      this.dificultad = props.dificultad;
      this.tiempoMin = props.tiempoMin;
      this.estado = props.estado;
      this.etiquetasInput = props.etiquetas;
      this.utensiliosInput = props.utensilios;
      this.restriccionesInput = props.restricciones;
      this.ingredientesInput = props.ingredientes;
      this.pasosInput = props.pasos;
    }
  }
}