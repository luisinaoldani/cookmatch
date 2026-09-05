import { Entity, Property, ManyToOne, PrimaryKey } from '@mikro-orm/decorators/es';
import type { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';

export interface RestriccionAlimentariaProps {
  nombre: string;
  descripcion?: string;
  tipoRestriccion: TipoRestriccion;
}

@Entity()
export class RestriccionAlimentaria {
  @PrimaryKey()
  id!: number;
  
  @Property({ length: 100 })
  nombre!: string;

  @Property({ length: 500, nullable: true })
  descripcion?: string;

  @ManyToOne({ deleteRule: 'cascade', updateRule: 'cascade' })
  tipoRestriccion!: TipoRestriccion;

  constructor(props?: RestriccionAlimentariaProps) {
    if (props) {
      this.tipoRestriccion = props.tipoRestriccion;
      this.nombre = props.nombre;
      this.descripcion = props.descripcion;
      this.tipoRestriccion = props.tipoRestriccion;
    }
  }
}