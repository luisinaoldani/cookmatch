import { useState } from "react";
import { Ingrediente } from "../../entities/ingrediente.entity";
import { useIngredientes } from "../../hooks/useIngrediente";
import { deleteIngrediente } from "../../services/ingrediente.service";
import IngredienteForm from "./ingredienteForm";
import Button from "../ui/button";

function IngredienteList() {
  const { ingredientes, loading, error, recargar } = useIngredientes();
  const [editando, setEditando] = useState<Ingrediente | undefined>();
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteIngrediente(id);
    recargar();
  };

  const handleGuardado = () => {
    setMostrarForm(false);
    setEditando(undefined);
    recargar();
  };

  if (loading) return <p className="text-ink/50">Cargando ingredientes...</p>;
  if (error) return <p className="text-tomato">{error}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ink">
          Ingredientes
        </h1>

        <Button
          texto="+ Nuevo ingrediente"
          onClick={() => {
            setEditando(undefined);
            setMostrarForm(true);
          }}
        />
      </div>

      {mostrarForm && (
        <IngredienteForm
          ingredienteEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => {
            setMostrarForm(false);
            setEditando(undefined);
          }}
        />
      )}

      <ul className="flex flex-col gap-2">
        {ingredientes.map((ingrediente) => (
          <li
            key={ingrediente.id}
            className="flex items-center justify-between rounded border border-ink/10 bg-white p-3"
          >
            <span className="text-ink/80">{ingrediente.nombre}</span>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditando(ingrediente);
                  setMostrarForm(true);
                }}
                className="text-sm text-basil hover:underline"
              >
                Editar
              </button>

              <button
                onClick={() => handleDelete(ingrediente.id!)}
                className="text-sm text-tomato hover:underline"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IngredienteList;