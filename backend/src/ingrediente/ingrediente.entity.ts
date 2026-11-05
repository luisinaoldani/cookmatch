import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';


export interface IngredienteProps {
  nombre: string;
}

@Entity()
export class Ingrediente {

  @PrimaryKey()
  id!: number;

  @Property({ length: 100, unique: true })
  nombre!: string;

  constructor(props?: IngredienteProps) {
    if (props) {
      this.nombre = props.nombre;
    }
  }
}