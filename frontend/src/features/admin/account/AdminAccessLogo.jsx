export function AdminAccessLogo({ onOpen }) {
  return (
    <button type="button" aria-label="Abrir acceso administrativo" onClick={onOpen}>
      <img src="/logo.svg" alt="Abrir acceso administrativo" />
    </button>
  );
}
