import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

export interface UtensilioProps {
  nombre: string;
}

@Entity()
export class Utensilio {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  nombre!: string;

  constructor(props?: UtensilioProps) {
    if (props) {
      this.nombre = props.nombre;
    }
  }
}