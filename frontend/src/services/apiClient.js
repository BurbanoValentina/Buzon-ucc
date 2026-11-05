const API_BASE_URL = '/api/v1';

export async function apiClient(path, options = {}) {
  const headers = { ...options.headers };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: 'same-origin',
    headers,
    ...options
  });
  if (response.status === 401) {
    const error = new Error('La sesión expiró.');
    error.code = 'SESSION_EXPIRED';
    throw error;
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.message || 'No fue posible completar la solicitud.');
  }
  return response.status === 204 ? undefined : response.json();
}
