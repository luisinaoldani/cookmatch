import { useIngredientes } from "../../hooks/useIngrediente";

function IngredienteList() {
  const { ingredientes, loading, error } = useIngredientes();

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