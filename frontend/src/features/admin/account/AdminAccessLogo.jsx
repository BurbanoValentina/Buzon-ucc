export function AdminAccessLogo({ onOpen }) {
  return (
    <button
      type="button"
      aria-label="Acceso institucional"
      title="Acceso institucional"
      onClick={onOpen}
      style={{
        background: 'transparent',
        border: 'none',
        padding: '4px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '8px',
        transition: 'opacity 0.2s'
      }}
    >
      <img
        src="/mailbox-logo.png"
        alt="Buzón UCC"
        style={{ width: '40px', height: '40px', objectFit: 'contain' }}
      />
    </button>
  );
}
