export function ComplaintTable({ complaints, onSelect }) {
  return (
    <table>
      <caption>Quejas registradas</caption>
      <thead><tr><th>ID</th><th>Fecha</th><th>Categoría</th><th>Estado</th><th>Acción</th></tr></thead>
      <tbody>
        {complaints.map((complaint) => (
          <tr key={complaint.id}>
            <td>{complaint.id}</td>
            <td>{complaint.registeredAt}</td>
            <td>{complaint.category}</td>
            <td>{complaint.status}</td>
            <td><button type="button" onClick={() => onSelect(complaint.id)}>Ver detalle</button></td>
          </tr>
        ))}
        {!complaints.length && <tr><td colSpan="5">No hay quejas para mostrar.</td></tr>}
      </tbody>
    </table>
  );
}
