import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-sm border border-ink/10 ${className}`}>
      {children}
    </div>
  );
}

export default Card;