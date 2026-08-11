import { Etiqueta } from './etiqueta.entity.js';

// El repository es la ÚNICA capa que va a hablar directo con MySQL.
// Por ahora dejamos los métodos declarados (con sus tipos de entrada y
// salida definidos) pero SIN implementar las queries, porque todavía no
// tenemos las credenciales de la base. El Service ya puede programarse
// contra esta interfaz sin esperar a que esto esté terminado.
export class EtiquetaRepository {
  async findAll(): Promise<Etiqueta[]> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async findById(id: number): Promise<Etiqueta | null> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async create(etiqueta: Etiqueta): Promise<Etiqueta> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async update(id: number, etiqueta: Etiqueta): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }

  async delete(id: number): Promise<boolean> {
    throw new Error('Pendiente: implementar cuando tengamos la conexión a la base de datos');
  }
}