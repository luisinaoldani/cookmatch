import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Receta } from "../entities/receta.entity";
import { getRecetaByCodigo } from "../services/receta.service";
import Card from "../components/ui/card";

function RecetaDetallePage() {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  // En App.tsx la ruta es /recetas/:recetaId, así que el parámetro se llama
  // recetaId. Se acepta también `id` por si la ruta se renombra.
  const id = Number(params.recetaId ?? params.id);
  const [receta, setReceta] = useState<Receta | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si el id de la URL no es un número válido, no se consulta al backend.
    if (!Number.isInteger(id)) {
      setReceta(undefined);
      setLoading(false);
      return;
    }

    setLoading(true);
    getRecetaByCodigo(id)
      .then((r) => setReceta(r))
      .catch(() => setReceta(undefined))
      .finally(() => setLoading(false));
  }, [id]);

  // Vuelve a la pantalla de la que se vino (¿Qué cocino?, Recetas o Recetas
  // por etiqueta). Si la página se abrió directo por URL no hay historial al
  // que volver (la key es "default"), así que va a ¿Qué cocino?.
  const volver = () => {
    if (location.key === "default") navigate("/buscar");
    else navigate(-1);
  };

  if (loading) return <p className="text-ink/50">Cargando...</p>;
  if (!receta) return <p className="text-tomato">Receta no encontrada.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <button type="button" onClick={volver} className="text-basil text-sm hover:underline">← Volver</button>
        <h1 className="font-display font-bold text-3xl text-ink mt-2">{receta.nombre}</h1>
        <span className="text-ink/40 text-sm font-mono">{receta.dificultad} · {receta.tiempoMin} min · {receta.estado}</span>
      </div>

      {(receta.etiquetas?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          {receta.etiquetas?.map((e) => (
            <span key={e.id} className="bg-yolk/20 text-ink/70 text-xs px-3 py-1 rounded-full">{e.nombre}</span>
          ))}
        </div>
      )}

      {(receta.restricciones?.length ?? 0) > 0 && (
        <div className="flex flex-wrap gap-2">
          {receta.restricciones?.map((r) => (
            <span key={r.id} className="bg-basil/10 text-basil text-xs font-semibold px-3 py-1 rounded-full">{r.nombre}</span>
          ))}
        </div>
      )}

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Ingredientes</h2>
        {(receta.ingredientes?.length ?? 0) > 0 ? (
          <ul className="flex flex-col gap-1">
            {receta.ingredientes?.map((ri, idx) => (
              <li key={idx} className="text-ink/70 text-sm">
                {ri.cantidad} {ri.unidadMedida} — {ri.ingrediente.nombre}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/50 text-sm">Esta receta todavía no tiene ingredientes.</p>
        )}
      </Card>

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Utensilios</h2>
        {(receta.utensilios?.length ?? 0) > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {receta.utensilios?.map((u) => (
              <li key={u.id} className="bg-surface text-ink/70 text-sm px-3 py-1 rounded-full">{u.nombre}</li>
            ))}
          </ul>
        ) : (
          <p className="text-ink/50 text-sm">Esta receta todavía no tiene utensilios.</p>
        )}
      </Card>

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Pasos</h2>
        {(receta.pasos?.length ?? 0) > 0 ? (
          <ol className="flex flex-col gap-2 list-decimal list-inside">
            {receta.pasos?.map((p) => (
              <li key={p.numero} className="text-ink/70 text-sm">{p.descripcion}</li>
            ))}
          </ol>
        ) : (
          <p className="text-ink/50 text-sm">Esta receta todavía no tiene pasos.</p>
        )}
      </Card>
    </div>
  );
}

export default RecetaDetallePage;