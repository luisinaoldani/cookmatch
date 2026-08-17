import { Entity, PrimaryKey, Property, OneToMany, ManyToMany } from '@mikro-orm/decorators/es';
import { Collection } from '@mikro-orm/core';
import type { Paso } from '../paso/paso.entity.js';
import type { RecetaIngrediente } from '../receta_ingrediente/receta_ingrediente.entity.js';
import type { Etiqueta } from '../etiqueta/etiqueta.entity.js';
import type { Utensilio } from '../utensilio/utensilio.entity.js';

export interface RecetaProps {
  nombre: string; // la columna admite NULL en la base real
  dificultad: string;
  tiempoMin: number;
  estado: string;
  // pasos e ingredientes NO se cargan desde acá: cada uno se crea por su
  // propio endpoint (PasoController / RecetaIngredienteController) y queda
  // enlazado por su FK a receta. Quedan tipados por compatibilidad con el
  // Service, pero el repository los ignora al crear/actualizar una receta.
  pasos?: Paso[];
  ingredientes?: RecetaIngrediente[];
  // etiquetas/utensilios sí se resuelven acá: son M:N sin datos propios
  // así que alcanza con mandar los ids en el body
  etiquetas?: { id: number }[];
  utensilios?: { id: number }[];
}

@Entity()
export class Receta {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  nombre!: string;

  @Property({ length: 100 })
  dificultad!: string;

  // fieldName explícito: sin esto, MikroORM convierte el nombre de la
  // propiedad a snake_case (`tiempo_min`) por default, y la columna real
  // se llama `tiempoMin` (camelCase, como el resto de esta tabla).
  @Property({ columnType: 'double unsigned', fieldName: 'tiempoMin' })
  tiempoMin!: number;

  @Property({ length: 100 })
  estado!: string;

  @OneToMany({ mappedBy: 'receta' })
  pasos = new Collection<Paso>(this);

  @OneToMany({ mappedBy: 'receta' })
  ingredientes = new Collection<RecetaIngrediente>(this);

  // M:N unidireccional. Se mapea EXPLÍCITAMENTE a la tabla intermedia real
  // (`receta_etiqueta`, columnas `idReceta`/`idEtiqueta`) porque los nombres
  // por convención de MikroORM (`receta_id`/`etiqueta_id`) no coinciden con
  // lo que ya está creado en la base. Sin target explícito: se infiere del
  // tipo de la propiedad (`Collection<Etiqueta>`).
  @ManyToMany({
    pivotTable: 'receta_etiqueta',
    joinColumn: 'idReceta',
    inverseJoinColumn: 'idEtiqueta',
  })
  etiquetas = new Collection<Etiqueta>(this);

  @ManyToMany({
    pivotTable: 'receta_utensilio',
    joinColumn: 'idReceta',
    inverseJoinColumn: 'idUtensilio',
  })
  utensilios = new Collection<Utensilio>(this);

  // Buffers transitorios (no decorados, no se persisten): guardan los ids
  // crudos que llegaron del body para que el repository arme las
  // referencias con em.getReference() antes del flush().
  etiquetasInput?: { id: number }[];
  utensiliosInput?: { id: number }[];

  constructor(props?: RecetaProps) {
    if (props) {
      this.nombre = props.nombre;
      this.dificultad = props.dificultad;
      this.tiempoMin = props.tiempoMin;
      this.estado = props.estado;
      this.etiquetasInput = props.etiquetas;
      this.utensiliosInput = props.utensilios;
    }
  }
}