import { useState, useEffect } from "react";
import { Etiqueta } from "../entities/etiqueta.entity";
import {getEtiquetas} from "../services/etiqueta.service";
import { etiquetaMock } from "../services/mocks/etiqueta.mock";

export function useEtiquetas() {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const upload = async () => { //hace 3 cosas en orden, prende el loading, pide los datos, los guarda en el estado, y al final apaga el loading con finally
    try {
      setLoading(true);
      const data = etiquetaMock; // TEMPORAL: usando mock hasta levantar el backend;
      setEtiquetas(data);
    } catch (err) {
      setError("Error al cargar etiquetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    upload();
  }, []);

  return { etiquetas, loading, error, reload: upload };
}