import { useState } from "react";
import { createEtiqueta } from "../../services/etiqueta.service";
import Input from "../ui/input";
import Button from "../ui/button";

interface EtiquetaFormProps {
  onCreated?: () => void;
}

function EtiquetaForm({ onCreated }: EtiquetaFormProps) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      await createEtiqueta({ nombre });
      setNombre("");
      onCreated?.();
    } catch (err) {
      setError("Error al crear la etiqueta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input label="Nombre" value={nombre} onChange={setNombre} />
      {error && <p>{error}</p>}
      <Button texto={loading ? "Guardando..." : "Guardar"} type="submit" disabled={loading} />
    </form>
  );
}

export default EtiquetaForm;