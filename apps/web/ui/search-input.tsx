import "@/styles/search-btn.css";

export default function SearchInput({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <label className="search-label">
      <input
        type="text"
        name="text"
        className="input"
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
      />
      <kbd className="search-button">⌘</kbd>
    </label>
  );
}
