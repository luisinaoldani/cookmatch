import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';
export interface EtiquetaProps {
  nombre: string;
}

@Entity()
export class Etiqueta {
  @PrimaryKey()
  id!: number;

  @Property({ length: 100 })
  nombre!: string;

  constructor(props?: EtiquetaProps) {
    if (props) {
      this.nombre = props.nombre;
    }
  }
}