// src/components/utensilio/UtensilioList.tsx
import { useState } from "react";
import { useUtensilios } from "../../hooks/useUtensilio";
import { deleteUtensilio } from "../../services/utensilio.service";
import { Utensilio } from "../../entities/utensilio.entity";
import UtensilioForm from "./utensilioForm";
import Button from "../ui/button";

function UtensilioList() {
  const { utensilios, loading, error, recargar } = useUtensilios();
  const [editando, setEditando] = useState<Utensilio | undefined>(undefined);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteUtensilio(id);
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
        <h1 className="font-display font-bold text-2xl text-ink">Utensilios</h1>
        <Button
          texto="+ Nuevo utensilio"
          onClick={() => { setEditando(undefined); setMostrarForm(true); }}
        />
      </div>

      {mostrarForm && (
        <UtensilioForm
          utensilioEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <ul className="flex flex-col gap-2">
        {utensilios.map((u) => (
          <li key={u.id} className="flex justify-between items-center bg-white p-3 rounded border border-ink/10">
            <span className="text-ink/80">{u.nombre}</span>
            <div className="flex gap-3">
              <button onClick={() => { setEditando(u); setMostrarForm(true); }} className="text-basil text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(u.id!)} className="text-tomato text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UtensilioList;