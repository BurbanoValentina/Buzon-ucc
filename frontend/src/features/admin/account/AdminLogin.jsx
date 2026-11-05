import { useState } from 'react';
import { login, recoverWithSecurityQuestion } from '../../../services/adminAuthApi';

export function AdminLogin({ onAuthenticated }) {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const result = mode === 'login'
        ? await login(username, password)
        : await recoverWithSecurityQuestion(username, answer);
      onAuthenticated?.(result);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} aria-label="Acceso de administrador">
      <h1>Acceso administrativo</h1>
      <label htmlFor="admin-username">Usuario</label>
      <input id="admin-username" value={username} onChange={(event) => setUsername(event.target.value)} />
      {mode === 'login' ? (
        <>
          <label htmlFor="admin-password">Contraseña</label>
          <input id="admin-password" type="password" value={password}
            onChange={(event) => setPassword(event.target.value)} />
        </>
      ) : (
        <>
          <p>¿Qué representante eres?</p>
          <label htmlFor="security-answer">Respuesta</label>
          <input id="security-answer" value={answer}
            onChange={(event) => setAnswer(event.target.value)} />
        </>
      )}
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={busy}>{busy ? 'Validando...' : 'Continuar'}</button>
      <button type="button" onClick={() => setMode(mode === 'login' ? 'recovery' : 'login')}>
        {mode === 'login' ? 'Usar pregunta clave' : 'Volver al inicio de sesión'}
      </button>
    </form>
  );
}
