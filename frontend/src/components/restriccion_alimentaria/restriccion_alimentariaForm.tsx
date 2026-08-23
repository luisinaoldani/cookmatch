import { useState, useEffect } from "react";
import { RestriccionAlimentaria } from "../../entities/restriccion_alimentaria.entity";
import { createRestriccionAlimentaria, updateRestriccionAlimentaria } from "../../services/restriccion_alimentaria.service";
import { useTiposRestriccion } from "../../hooks/useTipo_restriccion";
import Button from "../ui/button";
import Input from "../ui/input";

interface RestriccionAlimentariaFormProps {
  restriccionEditar?: RestriccionAlimentaria;
  onGuardado: () => void;
  onCancelar?: () => void;
}

function RestriccionAlimentariaForm({ restriccionEditar, onGuardado, onCancelar }: RestriccionAlimentariaFormProps) {
  const { tiposRestriccion, loading: loadingTipos } = useTiposRestriccion();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idTipoSeleccionado, setIdTipoSeleccionado] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);

  const esEdicion = !!restriccionEditar;

  useEffect(() => {
    if (restriccionEditar) {
      setNombre(restriccionEditar.nombre);
      setDescripcion(restriccionEditar.descripcion ?? "");
      setIdTipoSeleccionado(String(restriccionEditar.tipoRestriccion.id));
    }
  }, [restriccionEditar]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !idTipoSeleccionado) {
      setError("Completá el nombre y elegí un tipo de restricción");
      return;
    }

    const tipoRestriccion = tiposRestriccion.find((t) => t.id === Number(idTipoSeleccionado));
    if (!tipoRestriccion) {
      setError("Tipo de restricción inválido");
      return;
    }

    try {
      setGuardando(true);
      if (esEdicion && restriccionEditar) {
        await updateRestriccionAlimentaria(
          restriccionEditar.tipoRestriccion.id!,
          restriccionEditar.nombre,
          { nombre, descripcion, tipoRestriccion }
        );
      } else {
        await createRestriccionAlimentaria({ nombre, descripcion, tipoRestriccion });
      }
      setNombre("");
      setDescripcion("");
      setIdTipoSeleccionado("");
      onGuardado();
    } catch (err) {
      setError("Error al guardar la restricción alimentaria");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 bg-white p-4 rounded-lg shadow-sm border border-ink/10">
      <h2 className="font-display font-semibold text-lg text-ink">
        {esEdicion ? "Editar restricción alimentaria" : "Nueva restricción alimentaria"}
      </h2>

      <Input label="Nombre" value={nombre} onChange={setNombre} />
      <Input label="Descripción" value={descripcion} onChange={setDescripcion} />

      <div className="flex flex-col gap-1">
        <label className="text-sm text-ink/60">Tipo de restricción</label>
        {loadingTipos ? (
          <p className="text-sm text-ink/40">Cargando tipos...</p>
        ) : (
          <select
            value={idTipoSeleccionado}
            onChange={(e) => setIdTipoSeleccionado(e.target.value)}
            className="border border-ink/20 rounded px-3 py-2 text-sm"
          >
            <option value="">Seleccionar...</option>
            {tiposRestriccion.map((t) => (
              <option key={t.id} value={t.id}>{t.tipo}</option>
            ))}
          </select>
        )}
      </div>

      {error && <p className="text-tomato text-sm">{error}</p>}

      <div className="flex gap-2">
        <Button texto={guardando ? "Guardando..." : "Guardar"} type="submit" disabled={guardando} />
        {onCancelar && <Button texto="Cancelar" variant="secondary" onClick={onCancelar} />}
      </div>
    </form>
  );
}

export default RestriccionAlimentariaForm;