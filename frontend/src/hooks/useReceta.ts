import { useEffect, useState } from "react";
import { Receta } from "../entities/receta.entity";
import { getRecetas } from "../services/receta.service";

export function useRecetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getRecetas();
      setRecetas(data);
    } catch {
      setError("Error al cargar las recetas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recargar();
  }, []);

  return {
    recetas,
    loading,
    error,
    recargar,
  };
}