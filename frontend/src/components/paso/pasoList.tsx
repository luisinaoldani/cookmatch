import { Paso } from "../../entities/paso.entity";
import { deletePaso } from "../../services/paso.service";

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

  if (loading) return <p>Cargando pasos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ol>
      {pasos.map((paso) => (
        <li key={paso.numero}>
          <span>
            Paso {paso.numero}: {paso.descripcion}
          </span>

          <button onClick={() => onEdit(paso)}>Editar</button>

          <button onClick={() => handleDelete(paso.numero)}>
            Eliminar
          </button>
        </li>
      ))}
    </ol>
  );
}

export default PasoList;