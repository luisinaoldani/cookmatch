import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Receta } from "../entities/receta.entity";
import { getRecetas } from "../services/receta.service";
import { useEtiquetas } from "../hooks/useEtiqueta";

function RecetasPorEtiquetaPage() {
  const { etiquetas } = useEtiquetas();
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleEtiqueta = (id: number) => {
    setSeleccionadas((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const buscar = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getRecetas(seleccionadas);
        setRecetas(data);
      } catch {
        setError("Error al buscar recetas");
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [seleccionadas.join(",")]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display font-bold text-3xl text-ink">Recetas por etiqueta</h1>

      <div className="flex flex-wrap gap-2 justify-center">
        {etiquetas.map((et) => (
          <label key={et.id} className="flex items-center gap-1 text-sm border border-ink/20 rounded-full px-3 py-1 cursor-pointer">
            <input
              type="checkbox"
              checked={seleccionadas.includes(et.id!)}
              onChange={() => toggleEtiqueta(et.id!)}
            />
            {et.nombre}
          </label>
        ))}
      </div>

      {loading && <p className="text-ink/50">Buscando...</p>}
      {error && <p className="text-tomato">{error}</p>}

      {!loading && !error && (
        <ul className="flex flex-col gap-2">
          {recetas.map((r) => (
            <li key={r.id}>
              <Link to={`/recetas/${r.id}`} className="text-ink/80 hover:text-basil hover:underline">
                {r.nombre} <span className="text-ink/40 text-sm">({r.dificultad}, {r.tiempoMin} min)</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {!loading && !error && seleccionadas.length > 0 && recetas.length === 0 && (
        <p className="text-ink/50">No hay recetas con esas etiquetas.</p>
      )}
    </div>
  );
}

export default RecetasPorEtiquetaPage;