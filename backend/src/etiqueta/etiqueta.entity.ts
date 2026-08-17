import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

// La interfaz y el constructor no incluyen el id
// porque este se genera automáticamente al persistir la entidad
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