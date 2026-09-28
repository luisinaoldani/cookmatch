import { Receta } from "../../entities/receta.entity";
import { Asignacion } from "../../hooks/usePlanificacion";

interface RecetaAsignacionRowProps {
  receta: Receta;
  asignacion?: Asignacion;
  onAsignar: (recetaId: number, campo: "dia" | "momento", valor: string) => void;
}

const DIAS = [
  { value: "lunes", label: "Lunes" },
  { value: "martes", label: "Martes" },
  { value: "miercoles", label: "Miércoles" },
  { value: "jueves", label: "Jueves" },
  { value: "viernes", label: "Viernes" },
  { value: "sabado", label: "Sábado" },
  { value: "domingo", label: "Domingo" },
];

const MOMENTOS = [
  { value: "desayuno", label: "Desayuno" },
  { value: "almuerzo", label: "Almuerzo" },
  { value: "merienda", label: "Merienda" },
  { value: "cena", label: "Cena" },
];

const selectClase = "border border-ink/20 rounded px-2 py-1 text-sm text-ink outline-none focus:border-basil";

function RecetaAsignacionRow({ receta, asignacion, onAsignar }: RecetaAsignacionRowProps) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded border border-ink/10">
      <span className="text-ink/80 font-medium flex-1">{receta.nombre}</span>

      <select
        className={selectClase}
        value={asignacion?.dia ?? ""}
        onChange={(e) => onAsignar(receta.id!, "dia", e.target.value)}
      >
        <option value="">Elegir día...</option>
        {DIAS.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <select
        className={selectClase}
        value={asignacion?.momento ?? ""}
        onChange={(e) => onAsignar(receta.id!, "momento", e.target.value)}
      >
        <option value="">Elegir momento...</option>
        {MOMENTOS.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
    </div>
  );
}

export default RecetaAsignacionRow;