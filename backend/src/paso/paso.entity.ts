import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/es';
import type { Receta } from '../receta/receta.entity.js';

export interface PasoProps {
  idReceta?: number;
  receta?: Receta;
  numero?: number;
  descripcion: string;
}

@Entity()
export class Paso {
  @ManyToOne({ primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  receta!: Receta;

  @Property({ primary: true })
  numero!: number;

  @Property({ length: 500 })
  descripcion!: string;

  constructor(props?: PasoProps) {
    if (props) {
      if (props.receta) {
        this.receta = props.receta;
      } else if (props.idReceta !== undefined) {
        this.receta = { id: props.idReceta } as Receta;
      }
      if (props.numero !== undefined) this.numero = props.numero;
      this.descripcion = props.descripcion;
    }
  }

  get idReceta(): number | undefined {
    return this.receta?.id;
  }
}