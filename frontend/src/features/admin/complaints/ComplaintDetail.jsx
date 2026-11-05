export function ComplaintDetail({ complaint }) {
  if (!complaint) return null;
  return (
    <section aria-label="Detalle de queja">
      <h2>{complaint.id}</h2>
      <p><strong>Categoría:</strong> {complaint.category}</p>
      <p><strong>Asunto:</strong> {complaint.subject}</p>
      <p><strong>Descripción:</strong> {complaint.description}</p>
      {!complaint.anonymous && <><p><strong>Nombre:</strong> {complaint.name}</p><p><strong>Semestre:</strong> {complaint.semester}</p></>}
      <ul>{(complaint.evidenceLinks || []).map((link) => <li key={link}><a href={link}>Evidencia</a></li>)}</ul>
    </section>
  );
}
