import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/es';

// La interfaz de props se mantiene igual que en la versión "array en memoria":
// así el Service (que arma `new Ingrediente({...})`) no necesita tocarse.
export interface IngredienteProps {
  nombre: string;
}

@Entity()
export class Ingrediente {

  @PrimaryKey()
  id!: number;

  // unique: no puede haber dos ingredientes con el mismo nombre en el catálogo.
  // Es la última defensa: el Service ya chequea antes de guardar para dar un
  // mensaje claro, pero el índice único cubre el caso de dos requests simultáneos.
  @Property({ length: 100, unique: true })
  nombre!: string;

  // El constructor con props opcionales cumple dos roles: permite
  // `new Ingrediente({ nombre })` como antes, y permite `new Ingrediente()`
  // sin argumentos, que es lo que MikroORM necesita al hidratar filas.
  constructor(props?: IngredienteProps) {
    if (props) {
      this.nombre = props.nombre;
    }
  }
}