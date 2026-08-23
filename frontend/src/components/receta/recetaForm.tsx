import { useState, useEffect } from "react";
import { Receta } from "../../entities/receta.entity";
import { createReceta, updateReceta } from "../../services/receta.service";
import Input from "../ui/input";
import Button from "../ui/button";

interface RecetaFormProps {
  recetaEditar?: Receta;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function RecetaForm({ recetaEditar, onGuardado, onCancelar }: RecetaFormProps) {
  const [nombre, setNombre] = useState("");
  const [dificultad, setDificultad] = useState("Fácil");
  const [tiempoMin, setTiempoMin] = useState("");
  const [estado, setEstado] = useState("Borrador");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esEdicion = !!recetaEditar;

  useEffect(() => {
    if (recetaEditar) {
      setNombre(recetaEditar.nombre);
      setDificultad(recetaEditar.dificultad);
      setTiempoMin(String(recetaEditar.tiempoMin));
      setEstado(recetaEditar.estado);
    }
  }, [recetaEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !tiempoMin) {
      setError("Completá los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (esEdicion && recetaEditar?.id !== undefined) {
        await updateReceta(recetaEditar.id, {
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
        });
      } else {
        await createReceta({
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
          etiquetas: [],
          pasos: [],
          utensilios: [],
          ingredientes: [],
        });
      }

      setNombre("");
      setDificultad("Fácil");
      setTiempoMin("");
      setEstado("Borrador");

      onGuardado();
    } catch {
      setError("Error al guardar la receta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-ink/10">
      <h2 className="font-display font-semibold text-lg text-ink">
        {esEdicion ? "Editar receta" : "Nueva receta"}
      </h2>

      <Input label="Nombre" value={nombre} onChange={setNombre} />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Dificultad</label>
        <select
          value={dificultad}
          onChange={(e) => setDificultad(e.target.value)}
          className="border border-ink/20 rounded px-3 py-2 text-sm"
        >
          <option value="Fácil">Fácil</option>
          <option value="Media">Media</option>
          <option value="Difícil">Difícil</option>
        </select>
      </div>

      <Input
        label="Tiempo estimado (minutos)"
        value={tiempoMin}
        onChange={setTiempoMin}
      />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Estado</label>
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="border border-ink/20 rounded px-3 py-2 text-sm"
        >
          <option value="Borrador">Borrador</option>
          <option value="Publicada">Publicada</option>
        </select>
      </div>

      {error && <p className="text-tomato text-sm">{error}</p>}

      <div className="flex gap-2">
        <Button texto={loading ? "Guardando..." : "Guardar"} type="submit" disabled={loading} />
        {onCancelar && <Button texto="Cancelar" variant="secondary" onClick={onCancelar} />}
      </div>
    </form>
  );
}

export default RecetaForm;