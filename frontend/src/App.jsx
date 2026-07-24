import { useState } from 'react'

function App() {
  // Simulamos un estado reactivo como pide la cátedra
  const [likes, setLikes] = useState(0)

  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4 text-primary">🍳 CookMatch</h1>
      <p className="lead text-muted">¡Bootstrap quedó instalado correctamente!</p>

      {/* Tarjeta de ejemplo estilo Mobile-First usando Bootstrap */}
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4"> 
          {/* col-12 (Mobile), col-md-6 (Tablet), col-lg-4 (Compu) -> Breakpoints obligatorios */}
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Receta de Prueba</h5>
              <p className="card-text">Esta tarjeta se adapta automáticamente a celulares, tablets y computadoras.</p>
              
              {/* Manejo de eventos e interactividad */}
              <button 
                className="btn btn-outline-danger" 
                onClick={() => setLikes(likes + 1)}
              >
                ❤️ Likes: {likes}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

