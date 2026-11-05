import { useEffect, useState } from 'react';
import {
  confirmTelegramLink,
  getTelegramStatus,
  setTelegramNotifications,
  startTelegramLink,
  unlinkTelegram
} from '../../../services/telegramApi';

export function TelegramSettings() {
  const [status, setStatus] = useState({ linked: false, notificationsEnabled: false });
  const [accountId, setAccountId] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function refresh() {
    try {
      setStatus(await getTelegramStatus());
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function start(event) {
    event.preventDefault?.();
    setError('');
    setMessage('');
    try {
      await startTelegramLink(accountId);
      setMessage('Código enviado. Ingresa el código de 10 minutos.');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function confirm(event) {
    event.preventDefault();
    setError('');
    try {
      setStatus(await confirmTelegramLink(accountId, code));
      setMessage('Cuenta vinculada correctamente.');
      setCode('');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function unlink() {
    setError('');
    try {
      setStatus(await unlinkTelegram());
      setMessage('Cuenta desvinculada.');
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function updateNotifications(enabled) {
    setError('');
    try {
      setStatus(await setTelegramNotifications(enabled));
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  return (
    <section aria-label="Configuración de Telegram">
      <h1>Telegram</h1>
      <p>Estado: {status.linked ? 'vinculado' : 'no vinculado'}</p>
      <label htmlFor="telegram-account">Identificador de la cuenta</label>
      <input id="telegram-account" value={accountId}
        onChange={(event) => setAccountId(event.target.value)} />
      <button type="button" onClick={start}>Solicitar vinculación</button>
      <label htmlFor="telegram-code">Código de 10 minutos</label>
      <input id="telegram-code" value={code}
        onChange={(event) => setCode(event.target.value)} />
      <button type="button" onClick={confirm}>Confirmar</button>
      <label>
        <input type="checkbox" checked={status.notificationsEnabled}
          onChange={(event) => updateNotifications(event.target.checked)} />
        Activar avisos
      </label>
      <button type="button" onClick={unlink}>Desvincular</button>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert">{error}</p>}
    </section>
  );
}
