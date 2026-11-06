import { apiClient } from './apiClient';

export function createWordReport(selection) {
  return apiClient('/admin/reports/word/drafts', {
    method: 'POST',
    body: JSON.stringify(selection)
  });
}

export function updateWordReport(id, draft) {
  return apiClient(`/admin/reports/word/drafts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    body: JSON.stringify(draft)
  });
}

export function getWordReport(id) {
  return apiClient(`/admin/reports/word/drafts/${encodeURIComponent(id)}`);
}

export async function downloadWordReport(id) {
  const response = await fetch(`/api/v1/admin/reports/word/drafts/${encodeURIComponent(id)}/download`, {
    credentials: 'same-origin'
  });
  if (!response.ok) throw new Error('No fue posible descargar el reporte Word.');
  return response.blob();
}
