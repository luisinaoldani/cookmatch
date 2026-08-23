import { useEffect, useState } from "react";
import { createPaso, updatePaso,} from "../../services/paso.service";
import { Paso } from "../../entities/paso.entity";
import Input from "../ui/input";
import Button from "../ui/button";

interface PasoFormProps {
  recetaId: number;
  pasoEditando?: Paso | null;
  onSaved?: () => void;
}

function PasoForm({
  recetaId,
  pasoEditando,
  onSaved,
}: PasoFormProps) {
  const [descripcion, setDescripcion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setDescripcion(pasoEditando?.descripcion ?? "");
  }, [pasoEditando]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descripcion.trim()) {
      setError("Ingresá una descripción");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (pasoEditando) {
        await updatePaso(recetaId, pasoEditando.numero, { descripcion });
      } else {
        await createPaso(recetaId, { descripcion });
      }

      setDescripcion("");
      onSaved?.();
    } catch {
      setError("Error al guardar el paso");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Descripción del paso"
        value={descripcion}
        onChange={setDescripcion}
      />

      {error && <p>{error}</p>}

      <Button
        texto={
          loading
            ? "Guardando..."
            : pasoEditando
              ? "Guardar cambios"
              : "Agregar paso"
        }
        type="submit"
        disabled={loading}
      />
    </form>
  );
}

export default PasoForm;