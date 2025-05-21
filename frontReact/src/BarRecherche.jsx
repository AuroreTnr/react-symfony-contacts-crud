export default function BarRecherche({ value, onChange }) {
  // --- value ( = state searchQuery)
  // --- onChange ( = setSearchQuery )
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Rechercher un contact..."
      value={value} // <- value={searchQuery(la recherche utilisateur)}
      onChange={(e) => onChange(e.target.value)} // <- onChange ={(e) => setSearchQuery(e.target.value)}
    />
  );
}
