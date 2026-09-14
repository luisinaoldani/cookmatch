import { Paso } from "../../entities/paso.entity";
import { deletePaso } from "../../services/paso.service";
import Button from "../ui/button";

interface PasoListProps {
  recetaId: number;
  pasos: Paso[];
  loading: boolean;
  error: string | null;
  onEdit: (paso: Paso) => void;
  onChanged: () => void;
}

function PasoList({
  recetaId,
  pasos,
  loading,
  error,
  onEdit,
  onChanged,
}: PasoListProps) {
  const handleDelete = async (numero: number) => {
    await deletePaso(recetaId, numero);
    onChanged();
  };

  if (loading) return <p className="text-ink/50">Cargando pasos...</p>;
  if (error) return <p className="text-tomato">{error}</p>;

  return (
    <ol className="flex flex-col gap-2">
      {pasos.map((paso) => (
        <li
          key={paso.numero}
          className="flex items-center gap-3 rounded border border-ink/10 bg-white p-3"
        >
          <div className="flex gap-2 shrink-0">
            <Button texto="Editar" variant="secondary" onClick={() => onEdit(paso)} />
            <Button texto="Eliminar" variant="danger" onClick={() => handleDelete(paso.numero)} />
          </div>

          <span className="text-ink/80">
            <span className="font-semibold">Paso {paso.numero}:</span> {paso.descripcion}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default PasoList;