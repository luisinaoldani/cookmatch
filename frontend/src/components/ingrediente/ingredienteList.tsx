import { Ingrediente } from "../../entities/ingrediente.entity";

interface IngredienteListProps {
  ingredientes: Ingrediente[];
  loading: boolean;
  error: string | null;
}

function IngredienteList({ ingredientes, loading, error }: IngredienteListProps) {
  if (loading) return <p>Cargando ingrediente...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {ingredientes.map((ingrediente) => (
        <li key={ingrediente.id}>{ingrediente.nombre}</li>
      ))}
    </ul>
  );
}

export default IngredienteList;