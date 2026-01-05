export default function Select({
  name,
  value,
  options = [],
  placeholder,
  disabled = false,
  required = false,
  onChange,
  className = '',
  ...props
}) {
  return (
    <select
      name={name}
      value={value}
      disabled={disabled}
      required={required}
      onChange={onChange}
      className={`select ${className}`.trim()}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
