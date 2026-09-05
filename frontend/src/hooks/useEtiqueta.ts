import { useState, useEffect } from "react";
import { Etiqueta } from "../entities/etiqueta.entity";
import { getEtiquetas } from "../services/etiqueta.service";

export function useEtiquetas() {
  const [etiquetas, setEtiquetas] = useState<Etiqueta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEtiquetas();
      setEtiquetas(data);
    } catch (err) {
      setError("Error al cargar etiquetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { etiquetas, loading, error, recargar: cargar };
}

