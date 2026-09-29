import { Receta } from "../../entities/receta.entity";
import { Fila } from "../../hooks/usePlanificacion";

interface FilaAsignacionProps {
  fila: Fila;
  recetas: Receta[];
  onActualizar: (filaId: string, campo: "recetaId" | "dia" | "momento", valor: string | number) => void;
  onEliminar: (filaId: string) => void;
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

function FilaAsignacion({ fila, recetas, onActualizar, onEliminar }: FilaAsignacionProps) {
  return (
    <div className="flex items-center gap-3 bg-white p-3 rounded border border-ink/10">
      <select
        className={selectClase + " flex-1"}
        value={fila.recetaId ?? ""}
        onChange={(e) => onActualizar(fila.id, "recetaId", Number(e.target.value))}
      >
        <option value="">Elegir receta...</option>
        {recetas.map((r) => (
          <option key={r.id} value={r.id}>{r.nombre}</option>
        ))}
      </select>

      <select
        className={selectClase}
        value={fila.dia ?? ""}
        onChange={(e) => onActualizar(fila.id, "dia", e.target.value)}
      >
        <option value="">Elegir día...</option>
        {DIAS.map((d) => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      <select
        className={selectClase}
        value={fila.momento ?? ""}
        onChange={(e) => onActualizar(fila.id, "momento", e.target.value)}
      >
        <option value="">Elegir momento...</option>
        {MOMENTOS.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>

      <button onClick={() => onEliminar(fila.id)} className="text-tomato text-sm hover:underline whitespace-nowrap">
        Quitar
      </button>
    </div>
  );
}

export default FilaAsignacion;