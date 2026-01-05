export default function Input({
  type = 'text',
  name,
  value,
  placeholder,
  disabled = false,
  required = false,
  onChange,
  className = '',
  ...props
}) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      onChange={onChange}
      className={`input ${className}`.trim()}
      {...props}
    />
  );
}
