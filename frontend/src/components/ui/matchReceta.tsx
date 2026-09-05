interface MatchRecetaProps {
  porcentaje: number; 
}

function MatchReceta({ porcentaje }: MatchRecetaProps) {
  return (
    <div
      className="inline-flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 border-basil text-basil font-display font-bold -rotate-6 bg-yolk/20 shrink-0"
      role="status"
      aria-label={`${porcentaje} por ciento de ingredientes disponibles`}
    >
      <span className="text-lg leading-none">{porcentaje}%</span>
      <span className="text-[9px] font-body font-medium uppercase tracking-wide">match</span>
    </div>
  );
}

export default MatchReceta;