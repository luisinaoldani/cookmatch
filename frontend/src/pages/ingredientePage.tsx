import { useIngredientes } from "../hooks/useIngrediente";
import IngredienteList from "../components/ingrediente/ingredienteList";
import IngredienteForm from "../components/ingrediente/ingredienteForm";

function IngredientesPage() {
  const { ingredientes, loading, error, recargar } = useIngredientes();

  return (
    <div className="flex flex-col gap-6">
      <IngredienteForm onCreated={recargar} />
      <IngredienteList ingredientes={ingredientes} loading={loading} error={error} />
    </div>
  );
}

export default IngredientesPage;