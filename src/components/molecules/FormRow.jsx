import Label from '../atoms/Label.jsx';

export default function FormRow({ label, htmlFor, required, error, children, className = '' }) {
  return (
    <div className={`form-row ${error ? 'form-row--error' : ''} ${className}`.trim()}>
      {label && <Label htmlFor={htmlFor} required={required}>{label}</Label>}
      <div className="form-row__input">
        {children}
      </div>
      {error && <span className="form-row__error">{error}</span>}
    </div>
  );
}
