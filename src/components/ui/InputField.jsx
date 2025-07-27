const InputField = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-text-light mb-1"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 bg-surface border border-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default InputField;
