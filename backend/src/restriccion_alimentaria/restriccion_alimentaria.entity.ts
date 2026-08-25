import { Entity, Property, ManyToOne } from '@mikro-orm/decorators/es';
import type { TipoRestriccion } from '../tipo_restriccion/tipo_restriccion.entity.js';

export interface RestriccionAlimentariaProps {
  tipoRestriccion: TipoRestriccion;
  nombre: string;
  descripcion?: string;
}

@Entity()
export class RestriccionAlimentaria {

  // Sin target explícito: se infiere del tipo de la propiedad (`TipoRestriccion`).
  @ManyToOne({ primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  tipoRestriccion!: TipoRestriccion;

  @Property({ primary: true, length: 100 })
  nombre!: string;

  @Property({ length: 500, nullable: true })
  descripcion?: string;

  constructor(props?: RestriccionAlimentariaProps) {
    if (props) {
      this.tipoRestriccion = props.tipoRestriccion;
      this.nombre = props.nombre;
      this.descripcion = props.descripcion;
    }
  }
}