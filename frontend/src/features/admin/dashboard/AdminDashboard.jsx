import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashboard } from '../../../services/dashboardApi';

export function AdminDashboard() {
  const [period, setPeriod] = useState('MONTHLY');
  const [dashboard, setDashboard] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboard({ period })
      .then(setDashboard)
      .catch((requestError) => setError(requestError.message));
  }, [period]);

  if (!dashboard) return <section aria-label="Dashboard"><p role="status">Cargando...</p>{error && <p role="alert">{error}</p>}</section>;

  const realData = period === 'WEEKLY'
    ? dashboard.weekly.map((point) => ({ label: point.week || '', count: point.count }))
    : dashboard.monthly.map((point) => ({ label: point.month || '', count: point.count }));

  return (
    <section aria-label="Dashboard">
      <h1>Estadísticas</h1>
      <label htmlFor="dashboard-period">Período</label>
      <select id="dashboard-period" value={period} onChange={(event) => setPeriod(event.target.value)}>
        <option value="WEEKLY">Semanal</option>
        <option value="MONTHLY">Mensual</option>
      </select>
      {error && <p role="alert">{error}</p>}
      <p>Total: {dashboard.total}</p>
      <p>Anónimas: {dashboard.anonymous} · Identificadas: {dashboard.identified}</p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={realData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count" fill="#145A32" name="Datos reales" />
        </BarChart>
      </ResponsiveContainer>
      <h2>Predicciones de IA</h2>
      {dashboard.predictions.length === 0 && (
        <p>No hay predicciones: se requieren al menos cinco quejas totales o por categoría.</p>
      )}
      <ul>
        {dashboard.predictions.map((prediction, index) => (
          <li key={`${prediction.scope}-${prediction.category}-${index}`}>
            <strong>Estimación de IA — {prediction.category}:</strong> {prediction.estimate}
          </li>
        ))}
      </ul>
    </section>
  );
}
