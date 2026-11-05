import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicComplaintForm } from './features/complaints/PublicComplaintForm';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PublicComplaintForm />
  </StrictMode>
);
