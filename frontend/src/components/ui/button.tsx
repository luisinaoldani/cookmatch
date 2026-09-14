import { ReactNode } from "react";

interface ButtonProps {
  texto: string;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
}

const variantStyles = {
  primary: "bg-basil text-white hover:opacity-90",
  secondary: "text-ink/70 border border-ink/20 hover:bg-surface",
  danger: "bg-tomato text-white hover:opacity-90",
};

function Button({ texto, variant = "primary", type = "button", disabled, onClick, children, className = "" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-sm font-medium disabled:opacity-50 ${variantStyles[variant]} ${className}`}
    >
      {texto}
      {children}
    </button>
  );
}

export default Button;