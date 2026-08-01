import { useEffect, useState } from 'react';
import { RecetaCard } from './components/RecetaCard';
import { obtenerRecetas } from './services/receta.service';

function App() {
  const [recetas, setRecetas] = useState([]);
  const [error, setError] = useState(null);
  const [seleccionada, setSeleccionada] = useState(null);

  useEffect(() => {
    obtenerRecetas()
      .then((datos) => setRecetas(datos))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">🍳 CookMatch</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {seleccionada && (
        <div className="alert alert-info">
          Hiciste clic en la receta ID: <strong>{seleccionada}</strong>
        </div>
      )}

      {/* Grid Bootstrap de Tarjetas */}
      <div className="row">
        {recetas.map((r) => (
          <RecetaCard 
            key={r.id} 
            receta={r} 
            onVerDetalle={(id) => setSeleccionada(id)} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;