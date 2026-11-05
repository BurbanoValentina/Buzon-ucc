import { apiClient } from './apiClient';

function queryString(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') params.set(key, value);
  });
  return params.toString();
}

export function listComplaints(filters) {
  const query = queryString(filters);
  return apiClient(`/admin/complaints${query ? `?${query}` : ''}`);
}

export function getComplaint(id) {
  return apiClient(`/admin/complaints/${encodeURIComponent(id)}`);
}

export async function downloadComplaints(filters) {
  const query = queryString(filters);
  const response = await fetch(`/api/v1/admin/complaints/export.xlsx${query ? `?${query}` : ''}`, {
    credentials: 'same-origin'
  });
  if (!response.ok) throw new Error('No fue posible descargar el Excel.');
  return response.blob();
}
