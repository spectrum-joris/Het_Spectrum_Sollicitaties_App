export default function Card({ title, children, actions, className = '' }) {
  return (
    <div className={`card ${className}`.trim()}>
      {title && (
        <div className="card__header">
          <h3 className="card__title">{title}</h3>
          {actions && <div className="card__actions">{actions}</div>}
        </div>
      )}
      <div className="card__body">
        {children}
      </div>
    </div>
  );
}
