import { Entity, ManyToOne, Property } from '@mikro-orm/decorators/es';
import type { Ingrediente } from '../ingrediente/ingrediente.entity.js';
import type { Receta } from '../receta/receta.entity.js';

export interface RecetaIngredienteProps {
  receta: Receta;
  ingrediente: Ingrediente;
  cantidad: number;
  unidadMedida: string;
}

@Entity()
export class RecetaIngrediente {

  @ManyToOne({ primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  receta!: Receta;

  @ManyToOne({ primary: true, deleteRule: 'cascade', updateRule: 'cascade' })
  ingrediente!: Ingrediente;

  @Property({ columnType: 'double unsigned' })
  cantidad!: number;

  @Property({ length: 100 })
  unidadMedida!: string;

  constructor(props?: RecetaIngredienteProps) {
    if (props) {
      this.receta = props.receta;
      this.ingrediente = props.ingrediente;
      this.cantidad = props.cantidad;
      this.unidadMedida = props.unidadMedida;
    }
  }
}