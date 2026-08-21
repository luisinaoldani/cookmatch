import { useState } from "react";
import { useTiposRestriccion } from "../../hooks/useTipo_restriccion";
import { deleteTipoRestriccion } from "../../services/tipo_restriccion.service";
import { TipoRestriccion } from "../../entities/tipo_restriccion.entity";
import TipoRestriccionForm from "./tipo_restriccionForm";
import Button from "../ui/button";

function TipoRestriccionList() {
  const { tiposRestriccion, loading, error, recargar } = useTiposRestriccion();
  const [editando, setEditando] = useState<TipoRestriccion | undefined>(undefined);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteTipoRestriccion(id);
    recargar();
  };

  const handleGuardado = () => {
    setMostrarForm(false);
    setEditando(undefined);
    recargar();
  };

  if (loading) return <p className="text-ink/50">Cargando...</p>;
  if (error) return <p className="text-tomato">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl text-ink">Tipos de restricción</h1>
        <Button
          texto="+ Nuevo tipo"
          onClick={() => { setEditando(undefined); setMostrarForm(true); }}
        />
      </div>

      {mostrarForm && (
        <TipoRestriccionForm
          tipoRestriccionEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <ul className="flex flex-col gap-2">
        {tiposRestriccion.map((t) => (
          <li key={t.id} className="flex justify-between items-center bg-white p-3 rounded border border-ink/10">
            <span className="text-ink/80">{t.tipo}</span>
            <div className="flex gap-3">
              <button onClick={() => { setEditando(t); setMostrarForm(true); }} className="text-basil text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(t.id!)} className="text-tomato text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TipoRestriccionList;