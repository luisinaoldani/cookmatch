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

  @OneToMany({ mappedBy: 'tipoRestriccion' })
  restricciones = new Collection<RestriccionAlimentaria>(this);

  constructor(props?: TipoRestriccionProps) {
    if (props) {
      this.tipo = props.tipo!;
    }
  }
}