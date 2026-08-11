import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const links = [
  { label: "Inicio", to: "/" },
  { label: "Recetas", to: "/recetas" },
  { label: "Ingredientes", to: "/ingredientes" },
  { label: "Planificación", to: "/planificacion" },
];

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-paper border-b border-ink/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl text-basil">
          <span aria-hidden>🧺</span>
          CookMatch
        </Link>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-ink/70 hover:text-basil transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => navigate("/buscar")}
          className="hidden md:inline-flex bg-tomato text-white font-display font-medium text-sm px-4 py-2 rounded-full hover:opacity-90 transition"
        >
          ¿Qué cocino?
        </button>

        {/* Botón mobile */}
        <button
          className="md:hidden text-ink"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          {menuAbierto ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú mobile */}
      {menuAbierto && (
        <nav className="md:hidden flex flex-col gap-1 px-4 pb-4 font-medium text-sm">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuAbierto(false)}
              className="py-2 text-ink/70 hover:text-basil"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { navigate("/buscar"); setMenuAbierto(false); }}
            className="mt-2 bg-tomato text-white font-display font-medium text-sm px-4 py-2 rounded-full"
          >
            ¿Qué cocino?
          </button>
        </nav>
      )}
    </header>
  );
}

export default Navbar;