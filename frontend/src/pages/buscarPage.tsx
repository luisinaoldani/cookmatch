import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIngredientes } from "../hooks/useIngrediente";
import { useRecetas } from "../hooks/useReceta";
import IngredienteCheck from "../components/ui/ingredienteCheck";
import MatchReceta from "../components/ui/matchReceta";
import Card from "../components/ui/card";

function BuscarPage() {
  const { ingredientes, loading: loadingIngredientes } = useIngredientes();
  const { recetas, loading: loadingRecetas } = useRecetas();
  const [seleccionados, setSeleccionados] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleIngrediente = (id: number) => {
    setSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const recetasConMatch = recetas
    .map((r) => {
      const totalIngredientes = r.ingredientes?.length ?? 0;
      const coincidencias = r.ingredientes?.filter((ri) =>
        seleccionados.includes(ri.ingrediente.id!)
      ).length ?? 0;
      const porcentaje = totalIngredientes > 0
        ? Math.round((coincidencias / totalIngredientes) * 100)
        : 0;
      return { receta: r, porcentaje, coincidencias };
    })
    .filter((rm) => rm.coincidencias > 0)
    .sort((a, b) => b.porcentaje - a.porcentaje);

  if (loadingIngredientes || loadingRecetas) return <p className="text-ink/50">Cargando...</p>;

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center flex flex-col gap-2 py-6">
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-tomato">¿Qué cocino?</h1>
        <p className="text-ink/60 text-lg">Elegí lo que tenés en tu heladera y te decimos qué podés preparar.</p>
      </div>

      <div className="bg-white border border-ink/10 rounded-2xl p-6 flex flex-col gap-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="font-display font-semibold text-ink text-lg">Tus ingredientes</h2>
          {seleccionados.length > 0 && (
            <span className="bg-basil/10 text-basil text-xs font-semibold px-3 py-1 rounded-full">
              {seleccionados.length} seleccionado{seleccionados.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {ingredientes.map((i) => (
            <IngredienteCheck
              key={i.id}
              nombre={i.nombre}
              activo={seleccionados.includes(i.id!)}
              onClick={() => toggleIngrediente(i.id!)}
            />
          ))}
        </div>
      </div>

      {seleccionados.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center gap-2">
          <span className="text-5xl"></span>
          <p className="text-ink/40">Elegí al menos un ingrediente para descubrir recetas.</p>
        </div>
      ) : recetasConMatch.length === 0 ? (
        <div className="text-center py-12 flex flex-col items-center gap-2">
          <span className="text-5xl"></span>
          <p className="text-ink/40">No encontramos recetas con esos ingredientes. Probá con otra combinación.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <h2 className="font-display font-semibold text-ink text-lg">
            {recetasConMatch.length} receta{recetasConMatch.length > 1 ? "s" : ""} para vos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recetasConMatch.map(({ receta, porcentaje }) => (
              <Card
                key={receta.id}
                className="flex gap-3 items-center cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div onClick={() => navigate(`/recetas/${receta.id}`)} className="flex gap-3 items-center w-full">
                  <MatchReceta porcentaje={porcentaje} />
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-semibold text-base text-ink leading-tight">{receta.nombre}</h3>
                    <span className="text-ink/40 text-xs font-mono">{receta.dificultad} · {receta.tiempoMin} min</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BuscarPage;