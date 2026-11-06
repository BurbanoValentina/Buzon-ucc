import { useState } from 'react';
import { PublicComplaintForm } from './features/complaints/PublicComplaintForm';
import { AdminAccessLogo } from './features/admin/account/AdminAccessLogo';
import { AdminLogin } from './features/admin/account/AdminLogin';
import { AdminComplaintsPage } from './features/admin/complaints/AdminComplaintsPage';
import { AdminDashboard } from './features/admin/dashboard/AdminDashboard';
import { AdminAccountSettings } from './features/admin/account/AdminAccountSettings';
import { WordReportEditor } from './features/admin/reports/WordReportEditor';
import { TelegramSettings } from './features/admin/telegram/TelegramSettings';
import { MonthlyFollowUp } from './features/admin/status/MonthlyFollowUp';

export function App() {
  const [view, setView] = useState('public'); // 'public', 'login', 'admin'
  const [adminTab, setAdminTab] = useState('complaints'); // 'complaints', 'dashboard', 'reports', 'status', 'telegram', 'account'
  const [, setAdminUser] = useState(null);

  const handleOpenLogin = () => {
    setView('login');
  };

  const handleAuthenticated = (user) => {
    setAdminUser(user);
    setView('admin');
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem', fontFamily: 'sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #ccc', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Buzón UCC - Voz Estudiantil</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {view !== 'public' && (
            <button type="button" onClick={() => setView('public')}>
              Ir al Buzón Público
            </button>
          )}
          {/* Logo secreto de acceso administrativo */}
          <AdminAccessLogo onOpen={handleOpenLogin} />
        </div>
      </header>

      <main>
        {view === 'public' && (
          <section>
            <h2>Registrar Queja Académica</h2>
            <PublicComplaintForm />
          </section>
        )}

        {view === 'login' && (
          <section style={{ maxWidth: '400px', margin: '2rem auto' }}>
            <AdminLogin onAuthenticated={handleAuthenticated} />
          </section>
        )}

        {view === 'admin' && (
          <section>
            <nav style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', borderBottom: '1px solid #ddd', paddingBottom: '0.5rem' }}>
              <button type="button" onClick={() => setAdminTab('complaints')}>Quejas</button>
              <button type="button" onClick={() => setAdminTab('dashboard')}>Estadísticas</button>
              <button type="button" onClick={() => setAdminTab('reports')}>Reportes Word</button>
              <button type="button" onClick={() => setAdminTab('status')}>Seguimiento Mensual</button>
              <button type="button" onClick={() => setAdminTab('telegram')}>Telegram</button>
              <button type="button" onClick={() => setAdminTab('account')}>Mi Cuenta</button>
              <button type="button" onClick={() => { setAdminUser(null); setView('public'); }}>Cerrar sesión</button>
            </nav>

            {adminTab === 'complaints' && <AdminComplaintsPage />}
            {adminTab === 'dashboard' && <AdminDashboard />}
            {adminTab === 'reports' && <WordReportEditor />}
            {adminTab === 'status' && <MonthlyFollowUp />}
            {adminTab === 'telegram' && <TelegramSettings />}
            {adminTab === 'account' && <AdminAccountSettings />}
          </section>
        )}
      </main>
    </div>
  );
}
