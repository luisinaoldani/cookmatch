import { useState, useEffect } from "react";
import { Ingrediente } from "../entities/ingrediente.entity";
import { getIngredientes } from "../services/ingrediente.service";

export function useIngredientes() {
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getIngredientes();
      setIngredientes(data);
    } catch (err) {
      setError("Error al cargar ingredientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  return { ingredientes, loading, error, recargar: cargar };
}