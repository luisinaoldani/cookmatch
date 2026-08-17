import { useEtiquetas } from "../../hooks/useEtiqueta";

function EtiquetaList() {
  const { etiquetas, loading, error } = useEtiquetas();

  if (loading) return <p>Cargando etiquetas...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {etiquetas.map((etiqueta) => (
        <li key={etiqueta.id}>{etiqueta.nombre}</li>
      ))}
    </ul>
  );
}

export default EtiquetaList;