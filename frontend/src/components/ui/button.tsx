import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit";
  disabled?: boolean;
}

const variantStyles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700",
  secondary: "text-gray-600 hover:bg-gray-100",
  danger: "text-red-600 hover:underline",
};

function Button({ children, onClick, variant = "primary", type = "button", disabled }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded text-sm font-medium disabled:opacity-50 ${variantStyles[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;