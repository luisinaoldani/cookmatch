import { Entity, PrimaryKey, Property, OneToMany, ManyToMany } from '@mikro-orm/decorators/es';
import { Collection } from '@mikro-orm/core';
import type { Paso } from '../paso/paso.entity.js';
import type { RecetaIngrediente } from '../receta_ingrediente/receta_ingrediente.entity.js';
import type { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import type { Utensilio } from '../utensilio/utensilio.entity.js';
import type { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';

// Forma de cada ingrediente que llega en el body al crear/actualizar una receta:
// se elige un Ingrediente que ya existe en el catálogo (por id) y se indica
// cuánto lleva la receta.
export interface RecetaIngredienteInput {
  ingrediente: { id: number };
  cantidad: number;
  unidadMedida: string;
}

// Forma de cada paso que llega en el body: solo la descripción. El número
// no se manda nunca: lo asigna el repository según el orden del arreglo
// (el primero es el paso 1, el segundo el paso 2, etc.).
export interface RecetaPasoInput {
  descripcion: string;
}

export interface RecetaProps {
  nombre: string; // la columna admite NULL en la base real
  dificultad: string;
  tiempoMin: number;
  estado: string;
  // pasos sí se resuelven acá, igual que los ingredientes: el repository
  // crea/actualiza/borra las filas de Paso en el mismo flush() que la receta.
  // El orden del arreglo define el número de paso.
  pasos?: RecetaPasoInput[];
  // ingredientes sí se resuelven acá: el repository crea/actualiza/borra las
  // filas de RecetaIngrediente en el mismo flush() que la receta, así que se
  // guarda todo o no se guarda nada.
  ingredientes?: RecetaIngredienteInput[];
  // etiquetas/utensilios sí se resuelven acá: son M:N sin datos propios
  // así que alcanza con mandar los ids en el body
  etiquetas?: { id: number }[];
  utensilios?: { id: number }[];
  // restricciones: qué restricciones alimentarias cumple esta receta.
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

  // M:N unidireccional. Sin pivotTable/joinColumn explícitos: MikroORM
  // arma la tabla intermedia y las columnas por convención (snake_case)
  // porque ahora es la ORM la que crea la base, no al revés.
  @ManyToMany()
  etiquetas = new Collection<Etiqueta>(this);

  @ManyToMany()
  utensilios = new Collection<Utensilio>(this);

  // M:N unidireccional hacia RestriccionAlimentaria (PK propia autoincremental).
  // Indica qué restricciones alimentarias cumple esta receta, para poder
  // filtrar/excluir recetas al generar una planificación semanal.
  @ManyToMany()
  restricciones = new Collection<RestriccionAlimentaria>(this);

  // Buffers transitorios (no decorados, no se persisten): guardan los datos
  // crudos que llegaron del body para que el repository arme las
  // referencias con em.getReference() antes del flush().
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