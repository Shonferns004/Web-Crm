export default function Icon({ name, className = "" }) {
  return (
    <span className={`material-symbol ${className}`}>
      {name}
    </span>
  );
}
