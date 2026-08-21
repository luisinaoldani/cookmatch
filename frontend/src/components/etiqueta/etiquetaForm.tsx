import { useState, useEffect } from "react";
import { Etiqueta } from "../../entities/etiqueta.entity";
import { createEtiqueta, updateEtiqueta } from "../../services/etiqueta.service";
import Input from "../ui/input";
import Button from "../ui/button";

interface EtiquetaFormProps {
  etiquetaEditar?: Etiqueta;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function EtiquetaForm({ etiquetaEditar, onGuardado, onCancelar }: EtiquetaFormProps) {
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esEdicion = !!etiquetaEditar;

  useEffect(() => {
    if (etiquetaEditar) {
      setNombre(etiquetaEditar.nombre);
    }
  }, [etiquetaEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (esEdicion && etiquetaEditar?.id !== undefined) {
        await updateEtiqueta(etiquetaEditar.id, { nombre });
      } else {
        await createEtiqueta({ nombre });
      }
      setNombre("");
      onGuardado();
    } catch (err) {
      setError("Error al guardar la etiqueta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-ink/10">
      <h2 className="font-display font-semibold text-lg text-ink">
        {esEdicion ? "Editar etiqueta" : "Nueva etiqueta"}
      </h2>
      <Input label="Nombre" value={nombre} onChange={setNombre} />
      {error && <p className="text-tomato text-sm">{error}</p>}
      <div className="flex gap-2">
        <Button texto={loading ? "Guardando..." : "Guardar"} type="submit" disabled={loading} />
        {onCancelar && <Button texto="Cancelar" variant="secondary" onClick={onCancelar} />}
      </div>
    </form>
  );
}

export default EtiquetaForm;