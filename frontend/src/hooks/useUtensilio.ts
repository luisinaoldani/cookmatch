import { useState, useEffect } from "react";
import { Utensilio } from "../entities/utensilio.entity";
import { getUtensilios } from "../services/utensilio.service";

export function useUtensilios() {
  const [utensilios, setUtensilios] = useState<Utensilio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUtensilios();
      setUtensilios(data);
    } catch (err) {
      setError("Error al cargar utensilios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { utensilios, loading, error, recargar: cargar };
}