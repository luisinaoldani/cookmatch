import { useEffect, useState } from "react";
import { Paso } from "../entities/paso.entity";
import { getPasosByReceta } from "../services/paso.service";

export function usePasos(recetaId: number) {
  const [pasos, setPasos] = useState<Paso[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const recargar = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getPasosByReceta(recetaId);
      setPasos(data);
    } catch {
      setError("Error al cargar los pasos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    recargar();
  }, [recetaId]);

  return { pasos, loading, error, recargar };
}