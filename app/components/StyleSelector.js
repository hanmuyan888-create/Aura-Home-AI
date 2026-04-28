export default function StyleSelector({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ marginTop: '8px', padding: '8px', width: '100%', borderRadius: '8px', border: '1px solid #ccc' }}
    >
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>{opt.nameEn}</option>
      ))}
    </select>
  );
}