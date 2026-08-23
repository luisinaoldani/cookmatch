import { useState, useEffect } from "react";
import { RestriccionAlimentaria } from "../entities/restriccion_alimentaria.entity";
import { getRestriccionesAlimentarias } from "../services/restriccion_alimentaria.service";

export function useRestriccionesAlimentarias() {
  const [restricciones, setRestricciones] = useState<RestriccionAlimentaria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getRestriccionesAlimentarias();
      setRestricciones(data);
    } catch (err) {
      setError("Error al cargar restricciones alimentarias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { restricciones, loading, error, recargar: cargar };
}