import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Receta } from "../entities/receta.entity";
import { getRecetaByCodigo } from "../services/receta.service";
import Card from "../components/ui/card";

function RecetaDetallePage() {
  const { id } = useParams();
  const [receta, setReceta] = useState<Receta | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecetaByCodigo(Number(id)).then((r) => {
      setReceta(r);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <p className="text-ink/50">Cargando...</p>;
  if (!receta) return <p className="text-tomato">Receta no encontrada.</p>;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link to="/buscar" className="text-basil text-sm hover:underline">← Volver</Link>
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

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Ingredientes</h2>
        <ul className="flex flex-col gap-1">
          {receta.ingredientes?.map((ri, idx) => (
            <li key={idx} className="text-ink/70 text-sm">
              {ri.cantidad} {ri.unidadMedida} — {ri.ingrediente.nombre}
            </li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Utensilios</h2>
        <ul className="flex flex-wrap gap-2">
          {receta.utensilios?.map((u) => (
            <li key={u.id} className="bg-surface text-ink/70 text-sm px-3 py-1 rounded-full">{u.nombre}</li>
          ))}
        </ul>
      </Card>

      <Card>
        <h2 className="font-display font-semibold text-lg text-ink mb-2">Pasos</h2>
        <ol className="flex flex-col gap-2 list-decimal list-inside">
          {receta.pasos?.map((p) => (
            <li key={p.numero} className="text-ink/70 text-sm">{p.descripcion}</li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

export default RecetaDetallePage;