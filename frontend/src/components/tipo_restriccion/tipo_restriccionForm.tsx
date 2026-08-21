import { useState, useEffect } from "react";
import { TipoRestriccion } from "../../entities/tipo_restriccion.entity";
import { createTipoRestriccion, updateTipoRestriccion } from "../../services/tipo_restriccion.service";
import Button from "../ui/button";
import Input from "../ui/input";

interface TipoRestriccionFormProps {
  tipoRestriccionEditar?: TipoRestriccion;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function TipoRestriccionForm({ tipoRestriccionEditar, onGuardado, onCancelar }: TipoRestriccionFormProps) {
  const [tipo, setTipo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const esEdicion = !!tipoRestriccionEditar;

  useEffect(() => {
    if (tipoRestriccionEditar) {
      setTipo(tipoRestriccionEditar.tipo);
    }
  }, [tipoRestriccionEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!tipo.trim()) {
      setError("Completá el tipo");
      return;
    }

    try {
      setGuardando(true);
      if (esEdicion && tipoRestriccionEditar?.id !== undefined) {
        await updateTipoRestriccion(tipoRestriccionEditar.id, { tipo });
      } else {
        await createTipoRestriccion({ tipo });
      }
      setTipo("");
      onGuardado();
    } catch (err) {
      setError("Error al guardar el tipo de restricción");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-ink/10">
      <h2 className="font-display font-semibold text-lg text-ink">
        {esEdicion ? "Editar tipo de restricción" : "Nuevo tipo de restricción"}
      </h2>

      <Input label="Tipo" value={tipo} onChange={setTipo} />

      {error && <p className="text-tomato text-sm">{error}</p>}

      <div className="flex gap-2">
        <Button texto={guardando ? "Guardando..." : "Guardar"} type="submit" disabled={guardando} />
        {onCancelar && <Button texto="Cancelar" variant="secondary" onClick={onCancelar} />}
      </div>
    </form>
  );
}

export default TipoRestriccionForm;