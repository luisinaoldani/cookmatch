import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/es';
import { Collection } from '@mikro-orm/core';
import type { RestriccionAlimentaria } from '../restriccion_alimentaria/restriccion_alimentaria.entity.js';

export interface TipoRestriccionProps {
  tipo?: string;
  restricciones?: RestriccionAlimentaria[];
}

@Entity()
export class TipoRestriccion {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  tipo!: string;

  // Lado inverso de la relación: no genera columna, solo le dice al ORM
  // cuál es la propiedad dueña del otro lado (RestriccionAlimentaria.tipoRestriccion).
  // No se carga automáticamente: hay que pedirla con populate. mappedBy va
  // como string (no como callback) para que TsMorph no lo confunda con un
  // target de entidad.
  @OneToMany({ mappedBy: 'tipoRestriccion' })
  restricciones = new Collection<RestriccionAlimentaria>(this);

  constructor(props?: TipoRestriccionProps) {
    if (props) {
      this.tipo = props.tipo!;
      // Las restricciones no se cargan desde acá: cada una se crea/edita por
      // su propio endpoint (RestriccionAlimentariaController) y queda
      // enlazada por su FK tipoRestriccion. El array que llega en el body
      // de "crear tipo de restricción" se ignora a propósito.
    }
  }
}