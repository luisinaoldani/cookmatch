// src/components/receta/recetaList.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecetas } from "../../hooks/useReceta";
import { deleteReceta } from "../../services/receta.service";
import { Receta } from "../../entities/receta.entity";
import RecetaForm from "./recetaForm";
import Button from "../ui/button";
import Card from "../ui/card";

function RecetaList() {
  const { recetas, loading, error, recargar } = useRecetas();
  const [editando, setEditando] = useState<Receta | undefined>(undefined);
  const [mostrarForm, setMostrarForm] = useState(false);

  const handleDelete = async (id: number) => {
    await deleteReceta(id);
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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="font-display font-bold text-3xl text-tomato">Recetas</h1>
        <Button
          texto="+ Nueva receta"
          onClick={() => { setEditando(undefined); setMostrarForm(true); }}
        />
      </div>

      {mostrarForm && (
        <RecetaForm
          recetaEditar={editando}
          onGuardado={handleGuardado}
          onCancelar={() => setMostrarForm(false)}
        />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recetas.map((r) => (
          <Card key={r.id} className="flex flex-col gap-2">
            <Link to={`/recetas/${r.id}/pasos`}>
              <h3 className="font-display font-semibold text-lg text-ink hover:text-basil transition-colors">
                {r.nombre}
              </h3>
            </Link>
            <span className="text-ink/40 text-xs font-mono">{r.dificultad} · {r.tiempoMin} min · {r.estado}</span>
            {r.pasos?.[0] && (
              <p className="text-ink/60 text-sm line-clamp-2">{r.pasos[0].descripcion}</p>
            )}
            <div className="flex flex-wrap gap-2 mt-2">
              <button onClick={() => { setEditando(r); setMostrarForm(true); }} className="text-basil text-sm hover:underline">
                Editar
              </button>
              <button onClick={() => handleDelete(r.id!)} className="text-tomato text-sm hover:underline">
                Eliminar
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default RecetaList;