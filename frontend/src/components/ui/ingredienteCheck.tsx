interface IngredienteCheckProps {
  nombre: string;
  activo?: boolean;
  onClick?: () => void;
}

function IngredienteCheck({ nombre, activo, onClick }: IngredienteCheckProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
        activo
          ? "bg-basil text-white border-basil shadow-sm scale-105"
          : "bg-surface text-ink/70 border-transparent hover:border-basil/40"
      }`}
    >
      {activo && "✓ "}{nombre}
    </button>
  );
}

export default IngredienteCheck;