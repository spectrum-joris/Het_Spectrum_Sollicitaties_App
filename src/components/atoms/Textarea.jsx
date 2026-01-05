export default function Textarea({
  name,
  value,
  placeholder,
  rows = 4,
  disabled = false,
  required = false,
  onChange,
  className = '',
  ...props
}) {
  return (
    <textarea
      name={name}
      value={value}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      required={required}
      onChange={onChange}
      className={`textarea ${className}`.trim()}
      {...props}
    />
  );
}
