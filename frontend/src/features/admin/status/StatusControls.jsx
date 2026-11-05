import { useState } from 'react';
import { updateComplaintStatus } from '../../../services/statusApi';

const statuses = [
  ['COMPLETADA', 'Completada'],
  ['NO_COMPLETADA', 'No completada'],
  ['PENDIENTE', 'Pendiente']
];

export function StatusControls({ complaintId, currentStatus, onUpdated }) {
  const [status, setStatus] = useState(currentStatus);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function submit(event) {
    event.preventDefault();
    if (!comment.trim()) {
      setError('El comentario es obligatorio.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const history = await updateComplaintStatus(complaintId, status, comment);
      setComment('');
      onUpdated?.(history);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submit} aria-label="Gestionar estado">
      <label htmlFor="status">Nuevo estado</label>
      <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
        {statuses.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
      </select>
      <label htmlFor="status-comment">Comentario</label>
      <textarea id="status-comment" value={comment} onChange={(event) => setComment(event.target.value)} />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar estado'}</button>
    </form>
  );
}