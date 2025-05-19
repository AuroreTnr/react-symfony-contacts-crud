export default function BarRecherche({ value, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Rechercher un contact..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
