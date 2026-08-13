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
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "text-gray-600 hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
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