import { useState, useEffect } from "react";
import { Receta } from "../../entities/receta.entity";
import { createReceta, updateReceta } from "../../services/receta.service";
import { useEtiquetas } from "../../hooks/useEtiqueta";
import { useUtensilios } from "../../hooks/useUtensilio";
import Input from "../ui/input";
import Button from "../ui/button";

interface RecetaFormProps {
  recetaEditar?: Receta;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function RecetaForm({ recetaEditar, onGuardado, onCancelar }: RecetaFormProps) {
  const { etiquetas } = useEtiquetas();
  const { utensilios } = useUtensilios();

  const [nombre, setNombre] = useState("");
  const [dificultad, setDificultad] = useState("Fácil");
  const [tiempoMin, setTiempoMin] = useState("");
  const [estado, setEstado] = useState("Borrador");
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState<number[]>([]);
  const [utensiliosSeleccionados, setUtensiliosSeleccionados] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const esEdicion = !!recetaEditar;

  useEffect(() => {
    if (recetaEditar) {
      setNombre(recetaEditar.nombre);
      setDificultad(recetaEditar.dificultad);
      setTiempoMin(String(recetaEditar.tiempoMin));
      setEstado(recetaEditar.estado);
      setEtiquetasSeleccionadas(recetaEditar.etiquetas?.map((e) => e.id!) ?? []);
      setUtensiliosSeleccionados(recetaEditar.utensilios?.map((u) => u.id!) ?? []);
    }
  }, [recetaEditar]);

  const toggleEtiqueta = (id: number) => {
    setEtiquetasSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const toggleUtensilio = (id: number) => {
    setUtensiliosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !tiempoMin) {
      setError("Completá los campos obligatorios");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const etiquetasPayload = etiquetasSeleccionadas.map((id) => ({ id }));
      const utensiliosPayload = utensiliosSeleccionados.map((id) => ({ id }));

      if (esEdicion && recetaEditar?.id !== undefined) {
        await updateReceta(recetaEditar.id, {
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
          etiquetas: etiquetasPayload as any,
          utensilios: utensiliosPayload as any,
        });
      } else {
        await createReceta({
          nombre,
          dificultad,
          tiempoMin: Number(tiempoMin),
          estado,
          etiquetas: etiquetasPayload as any,
          utensilios: utensiliosPayload as any,
          pasos: [],
          ingredientes: [],
        });
      }

      setNombre("");
      setDificultad("Fácil");
      setTiempoMin("");
      setEstado("Borrador");
      setEtiquetasSeleccionadas([]);
      setUtensiliosSeleccionados([]);

      onGuardado();
    } catch (err) {
      console.error("Error real:", err);
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

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Etiquetas</label>
        <div className="flex flex-wrap gap-2">
          {etiquetas.map((et) => (
            <label key={et.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={etiquetasSeleccionadas.includes(et.id!)}
                onChange={() => toggleEtiqueta(et.id!)}
              />
              {et.nombre}
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Utensilios</label>
        <div className="flex flex-wrap gap-2">
          {utensilios.map((u) => (
            <label key={u.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
              <input
                type="checkbox"
                checked={utensiliosSeleccionados.includes(u.id!)}
                onChange={() => toggleUtensilio(u.id!)}
              />
              {u.nombre}
            </label>
          ))}
        </div>
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