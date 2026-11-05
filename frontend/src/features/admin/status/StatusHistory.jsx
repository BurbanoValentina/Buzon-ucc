export function StatusHistory({ history = [] }) {
  return (
    <section aria-label="Historial de estados">
      <h2>Historial</h2>
      <ol>
        {history.map((item, index) => (
          <li key={`${item.changedAt}-${index}`}>
            <strong>{item.newStatus}</strong> — {item.comment} ({item.changedAt})
          </li>
        ))}
      </ol>
    </section>
  );
}