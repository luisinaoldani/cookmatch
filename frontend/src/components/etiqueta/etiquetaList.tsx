import { useState } from "react";
import { useEtiquetas } from "../../hooks/useEtiqueta";
import { deleteEtiqueta } from "../../services/etiqueta.service";
import { Etiqueta } from "../../entities/etiqueta.entity";
import EtiquetaForm from "./etiquetaForm";
import Button from "../ui/button";

function EtiquetaList() {
  const { etiquetas, loading, error, recargar } = useEtiquetas();
  const [editando, setEditando] = useState<Etiqueta | undefined>(undefined);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteEtiqueta(id);
    recargar();
  };

  const handleGuardado = () => {
    setMostrarForm(false);
    setEditando(undefined);
    recargar();
  };

  if (loading) return <p className="text-ink/50">Cargando etiquetas...</p>;
  if (error) return <p className="text-tomato">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-2xl text-ink">Etiquetas</h1>
        <Button
          texto="+ Nueva etiqueta"
          onClick={() => { setEditando(undefined); setMostrarForm(true); }}
        />
      </div>

      {mostrarForm && (
        <EtiquetaForm
          etiquetaEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <ul className="flex flex-col gap-2">
        {etiquetas.map((etiqueta) => (
          <li key={etiqueta.id} className="flex justify-between items-center bg-white p-3 rounded border border-ink/10">
            <span className="text-ink/80">{etiqueta.nombre}</span>
            <div className="flex gap-3">
              <button onClick={() => { setEditando(etiqueta); setMostrarForm(true); }} className="text-basil text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(etiqueta.id!)} className="text-tomato text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EtiquetaList;