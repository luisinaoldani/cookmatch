import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Paso } from "../entities/paso.entity";
import { usePasos } from "../hooks/usePaso";
import PasoForm from "../components/paso/pasoForm";
import PasoList from "../components/paso/pasoList";

function PasosPage() {
  const { recetaId } = useParams();
  const id = Number(recetaId);

  const { pasos, loading, error, recargar } = usePasos(id);
  const [pasoEditando, setPasoEditando] = useState<Paso | null>(null);

  const handleSaved = () => {
    setPasoEditando(null);
    recargar();
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h2 className="font-display font-bold text-2xl text-ink">Pasos de la receta</h2>
        <Link to="/recetas" className="text-basil text-sm hover:underline">
          ← Volver a recetas
        </Link>
      </div>

      <PasoForm
        recetaId={id}
        pasoEditando={pasoEditando}
        onSaved={handleSaved}
      />

      <PasoList
        recetaId={id}
        pasos={pasos}
        loading={loading}
        error={error}
        onEdit={setPasoEditando}
        onChanged={recargar}
      />
    </div>
  );
}

export default PasosPage;