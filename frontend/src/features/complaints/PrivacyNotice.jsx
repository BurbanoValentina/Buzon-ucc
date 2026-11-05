export function PrivacyNotice({ checked, onChange, error }) {
  return (
    <div>
      <p>Usaremos los datos y evidencias únicamente para gestionar la queja.</p>
      <label>
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        Acepto el aviso de privacidad
      </label>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
