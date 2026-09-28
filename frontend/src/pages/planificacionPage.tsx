import { usePlanificacion } from "../hooks/usePlanificacion";
import RecetaAsignacionRow from "../components/planificacion/recetaAsignacionRow";
import Button from "../components/ui/button";

const DIAS_LABEL: Record<string, string> = {
  lunes: "Lunes", martes: "Martes", miercoles: "Miércoles", jueves: "Jueves",
  viernes: "Viernes", sabado: "Sábado", domingo: "Domingo",
};

function PlanificacionPage() {
  const { recetas, loadingRecetas, asignaciones, asignar, generar, resultado, loadingGenerar, error } = usePlanificacion();

  if (loadingRecetas) return <p className="text-ink/50">Cargando recetas...</p>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display font-bold text-2xl text-ink">Planificación semanal</h1>

      <div className="flex flex-col gap-2">
        {recetas.map((receta) => (
          <RecetaAsignacionRow
            key={receta.id}
            receta={receta}
            asignacion={asignaciones[receta.id!]}
            onAsignar={asignar}
          />
        ))}
      </div>

      <Button
        texto={loadingGenerar ? "Generando..." : "Generar planificación"}
        onClick={generar}
        disabled={loadingGenerar}
      />

      {error && <p className="text-tomato">{error}</p>}

      {resultado && (
        <div className="flex flex-col gap-3 mt-4">
          <h2 className="font-display font-bold text-xl text-ink">Tu semana</h2>
          {resultado.map((dia) => (
            <div key={dia.dia} className="bg-white p-3 rounded border border-ink/10">
              <p className="font-medium text-ink capitalize">{DIAS_LABEL[dia.dia] ?? dia.dia}</p>
              <ul className="text-sm text-ink/70 pl-4 list-disc">
                <li>Desayuno: {dia.comidas.desayuno.nombre}</li>
                <li>Almuerzo: {dia.comidas.almuerzo.nombre}</li>
                <li>Merienda: {dia.comidas.merienda.nombre}</li>
                <li>Cena: {dia.comidas.cena.nombre}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PlanificacionPage;