import { useState } from 'react';
import {
  createWordReport,
  downloadWordReport,
  updateWordReport
} from '../../../services/wordReportApi';

export function WordReportEditor() {
  const [draft, setDraft] = useState(null);
  const [selection, setSelection] = useState({ complaintIds: [], category: '' });
  const [error, setError] = useState('');

  async function generate(event) {
    event.preventDefault();
    setError('');
    try {
      const generated = await createWordReport(selection);
      setDraft(generated);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function save() {
    setError('');
    try {
      setDraft(await updateWordReport(draft.id, draft));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function download() {
    setError('');
    try {
      const blob = await downloadWordReport(draft.id);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'reporte.docx';
      link.click();
      URL.revokeObjectURL(url);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section aria-label="Reportes Word editables">
      <h1>Reporte Word</h1>
      {error && <p role="alert">{error}</p>}
      <form onSubmit={generate}>
        <label htmlFor="word-category">Categoría</label>
        <input
          id="word-category"
          value={selection.category}
          onChange={(event) => setSelection({ ...selection, category: event.target.value })}
        />
        <label htmlFor="word-ids">Identificadores (separados por coma)</label>
        <input
          id="word-ids"
          value={selection.complaintIds.join(',')}
          onChange={(event) => setSelection({
            ...selection,
            complaintIds: event.target.value.split(',').map((item) => item.trim()).filter(Boolean)
          })}
        />
        <button type="submit">Generar borrador</button>
      </form>

      {draft && (
        <div>
          <label htmlFor="word-title">Título</label>
          <input
            id="word-title"
            value={draft.title}
            onChange={(event) => setDraft({ ...draft, title: event.target.value })}
          />
          <label htmlFor="word-content">Contenido editable</label>
          <textarea
            id="word-content"
            rows="18"
            value={draft.content}
            onChange={(event) => setDraft({ ...draft, content: event.target.value })}
          />
          <button type="button" onClick={save}>Guardar edición</button>
          <button type="button" onClick={download}>Descargar Word</button>
        </div>
      )}
    </section>
  );
}
