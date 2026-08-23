import { useState } from "react";
import { useRestriccionesAlimentarias } from "../../hooks/useRestriccion_alimentaria";
import { deleteRestriccionAlimentaria } from "../../services/restriccion_alimentaria.service";
import { RestriccionAlimentaria } from "../../entities/restriccion_alimentaria.entity";
import RestriccionAlimentariaForm from "./restriccion_alimentariaForm";
import Button from "../ui/button";

function RestriccionAlimentariaList() {
  const { restricciones, loading, error, recargar } = useRestriccionesAlimentarias();
  const [editando, setEditando] = useState<RestriccionAlimentaria | undefined>(undefined);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (idTipo: number, nombre: string) => {
    await deleteRestriccionAlimentaria(idTipo, nombre);
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
        <h1 className="font-display font-bold text-2xl text-ink">Restricciones alimentarias</h1>
        <Button
          texto="+ Nueva restricción"
          onClick={() => { setEditando(undefined); setMostrarForm(true); }}
        />
      </div>

      {mostrarForm && (
        <RestriccionAlimentariaForm
          restriccionEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <ul className="flex flex-col gap-2">
        {restricciones.map((r) => (
          <li
            key={`${r.tipoRestriccion.id}-${r.nombre}`}
            className="flex justify-between items-center bg-white p-3 rounded border border-ink/10"
          >
            <div>
              <span className="text-ink/80 font-medium">{r.nombre}</span>
              <span className="text-ink/40 text-sm"> — {r.tipoRestriccion.tipo}</span>
              {r.descripcion && <p className="text-ink/50 text-sm">{r.descripcion}</p>}
            </div>
            <div className="flex gap-3">
              <button onClick={() => { setEditando(r); setMostrarForm(true); }} className="text-basil text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(r.tipoRestriccion.id!, r.nombre)} className="text-tomato text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestriccionAlimentariaList;