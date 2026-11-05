import { useState } from 'react';
import { changeCredentials } from '../../../services/adminAuthApi';

export function AdminAccountSettings({ onUpdated }) {
  const [form, setForm] = useState({
    username: '', currentPassword: '', newPassword: '', securityAnswer: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function update(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    try {
      const result = await changeCredentials(form);
      setMessage('Credenciales actualizadas.');
      onUpdated?.(result);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <form onSubmit={submit} aria-label="Configuración de administrador">
      <h1>Configuración de cuenta</h1>
      <label htmlFor="new-username">Nuevo usuario</label>
      <input id="new-username" value={form.username}
        onChange={(event) => update('username', event.target.value)} />
      <label htmlFor="current-password">Contraseña actual</label>
      <input id="current-password" type="password" value={form.currentPassword}
        onChange={(event) => update('currentPassword', event.target.value)} />
      <label htmlFor="new-password">Nueva contraseña</label>
      <input id="new-password" type="password" value={form.newPassword}
        onChange={(event) => update('newPassword', event.target.value)} />
      <label htmlFor="security-answer">Nueva respuesta</label>
      <input id="security-answer" value={form.securityAnswer}
        onChange={(event) => update('securityAnswer', event.target.value)} />
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
      <button type="submit">Guardar cambios</button>
    </form>
  );
}
