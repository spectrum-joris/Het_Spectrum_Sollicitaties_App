export default function Label({ htmlFor, children, required = false, className = '' }) {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`.trim()}>
      {children}
      {required && <span className="label__required">*</span>}
    </label>
  );
}
