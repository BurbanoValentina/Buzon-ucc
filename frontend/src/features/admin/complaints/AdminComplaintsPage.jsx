import { useState } from 'react';
import { downloadComplaints, getComplaint, listComplaints } from '../../../services/adminComplaintsApi';
import { ComplaintDetail } from './ComplaintDetail';
import { ComplaintFilters } from './ComplaintFilters';
import { ComplaintTable } from './ComplaintTable';

export function AdminComplaintsPage() {
  const [filters, setFilters] = useState({});
  const [complaints, setComplaints] = useState([]);
  const [detail, setDetail] = useState(null);
  const [state, setState] = useState({ loading: false, error: '' });

  async function load(event) {
    event?.preventDefault();
    setState({ loading: true, error: '' });
    try {
      setComplaints(await listComplaints(filters));
      setState({ loading: false, error: '' });
    } catch (error) {
      setState({ loading: false, error: error.message });
    }
  }

  async function select(id) {
    try { setDetail(await getComplaint(id)); } catch (error) { setState({ loading: false, error: error.message }); }
  }

  async function download() {
    try {
      const blob = await downloadComplaints(filters);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = 'quejas.xlsx';
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (error) { setState({ loading: false, error: error.message }); }
  }

  return (
    <main>
      <h1>Consultar quejas</h1>
      <ComplaintFilters filters={filters} onChange={setFilters} onSubmit={load} />
      <button type="button" onClick={download}>Descargar Excel</button>
      {state.loading && <p role="status">Cargando...</p>}
      {state.error && <p role="alert">{state.error}</p>}
      <ComplaintTable complaints={complaints} onSelect={select} />
      <ComplaintDetail complaint={detail} />
    </main>
  );
}
