import { useEffect, useState } from 'react';
import { getMonthlyFollowUp } from '../../../services/statusApi';

export function MonthlyFollowUp() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getMonthlyFollowUp().then(setEvents).catch((requestError) => setError(requestError.message));
  }, []);

  return (
    <section aria-label="Seguimiento mensual">
      <h2>Seguimiento mensual</h2>
      {error && <p role="alert">{error}</p>}
      <ul>
        {events.map((event) => (
          <li key={`${event.complaintId}-${event.eventType}-${event.occurredAt}`}>
            {event.eventMonth}: {event.eventType} — {event.complaintId}
          </li>
        ))}
      </ul>
    </section>
  );
}