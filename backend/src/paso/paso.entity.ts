import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/es';
import type { Receta } from '../receta/receta.entity.js';

// Paso tiene clave primaria COMPUESTA: (receta, numero). Antes `idReceta`
// era un number suelto; ahora es una relación @ManyToOne real (así Receta
// puede hacer populate: ['pasos'] sin pasar por una query manual), pero
// se sigue pudiendo crear un Paso pasando solo el id con `idReceta`.
export interface PasoProps {
  idReceta?: number;
  receta?: Receta;
  numero?: number; // lo calcula el repository al crear, no hace falta mandarlo
  descripcion: string;
}

@Entity()
export class Paso {
  @ManyToOne({ primary: true, fieldName: 'idReceta', deleteRule: 'cascade', updateRule: 'cascade' })
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
        // Referencia "liviana": alcanza con el id para que el repository
        // arme la referencia real con em.getReference() antes de persistir.
        this.receta = { id: props.idReceta } as Receta;
      }
      if (props.numero !== undefined) this.numero = props.numero;
      this.descripcion = props.descripcion;
    }
  }

  // Getter de compatibilidad: el resto del código (service, controller)
  // sigue leyendo `paso.idReceta` como un número.
  get idReceta(): number | undefined {
    return this.receta?.id;
  }
}