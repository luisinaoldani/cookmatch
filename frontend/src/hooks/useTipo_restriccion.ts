import { useState, useEffect } from "react";
import { TipoRestriccion } from "../entities/tipo_restriccion.entity";
import { getTiposRestriccion } from "../services/tipo_restriccion.service";

export function useTiposRestriccion() {
  const [tiposRestriccion, setTiposRestriccion] = useState<TipoRestriccion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTiposRestriccion();
      setTiposRestriccion(data);
    } catch (err) {
      setError("Error al cargar tipos de restricción");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { tiposRestriccion, loading, error, recargar: cargar };
}