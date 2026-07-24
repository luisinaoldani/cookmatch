import React from 'react';

export function RecetaCard({ receta, onVerDetalle }) {
  if (!receta) return null;

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-success">{receta.nombre}</h5>
          <p className="card-text text-muted">
            Dificultad: <span className="badge bg-info text-dark">{receta.dificultad || 'Media'}</span>
          </p>
          <button 
            className="btn btn-outline-success mt-auto"
            onClick={() => onVerDetalle(receta.id)}
          >
            Ver Detalle
          </button>
        </div>
      </div>
    </div>
  );
}