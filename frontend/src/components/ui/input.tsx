interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  error?: string;
}

function Input({ label, value, onChange, type = "text", disabled, error }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="border border-gray-300 rounded px-3 py-2 text-sm disabled:bg-gray-100"
      />
      {error && <p className="text-red-600 text-xs">{error}</p>}
    </div>
  );
}

export default Input;