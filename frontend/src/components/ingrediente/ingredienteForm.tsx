import { useEffect, useState } from "react";
import { Ingrediente } from "../../entities/ingrediente.entity";
import {createIngrediente, updateIngrediente,} from "../../services/ingrediente.service";
import Input from "../ui/input";
import Button from "../ui/button";

interface IngredienteFormProps {
  ingredienteEditar?: Ingrediente;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function IngredienteForm({
  ingredienteEditar,
  onGuardado,
  onCancelar,
}: IngredienteFormProps) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esEdicion = !!ingredienteEditar;

  useEffect(() => {
    setNombre(ingredienteEditar?.nombre ?? "");
  }, [ingredienteEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      if (esEdicion && ingredienteEditar?.id !== undefined) {
        await updateIngrediente(ingredienteEditar.id, { nombre });
      } else {
        await createIngrediente({ nombre });
      }

      setNombre("");
      onGuardado();
    } catch {
      setError("Error al guardar el ingrediente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-lg border border-ink/10 bg-white p-4 shadow-sm"
    >
      <h2 className="font-display text-lg font-semibold text-ink">
        {esEdicion ? "Editar ingrediente" : "Nuevo ingrediente"}
      </h2>

      <Input label="Nombre" value={nombre} onChange={setNombre} />

      {error && <p className="text-sm text-tomato">{error}</p>}

      <div className="flex gap-2">
        <Button
          texto={loading ? "Guardando..." : "Guardar"}
          type="submit"
          disabled={loading}
        />

        {onCancelar && (
          <Button
            texto="Cancelar"
            variant="secondary"
            onClick={onCancelar}
          />
        )}
      </div>
    </form>
  );
}

export default IngredienteForm;