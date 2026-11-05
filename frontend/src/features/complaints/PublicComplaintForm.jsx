import { useMemo, useState } from 'react';
import { submitComplaint } from '../../services/complaintsApi';
import { CATEGORIES, counters, numberIsRequired, validateComplaint } from './complaintValidation';
import { EvidenceUploader } from './EvidenceUploader';
import { PrivacyNotice } from './PrivacyNotice';

const initialValues = {
  userType: 'anonymous', name: '', semester: '', category: '',
  locationNumber: '', subject: '', description: '', privacyAccepted: false
};

export function PublicComplaintForm({ onSubmitted = () => {} }) {
  const [values, setValues] = useState(initialValues);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: '' });
  const count = useMemo(() => counters(values), [values]);
  const update = (field, value) => setValues((current) => ({ ...current, [field]: value }));

  async function submit(event) {
    event.preventDefault();
    const nextErrors = validateComplaint({ ...values, files });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setStatus({ loading: true, message: '' });
    try {
      const response = await submitComplaint(values, files);
      setStatus({ loading: false, message: response.message });
      onSubmitted(response);
    } catch (error) {
      setStatus({ loading: false, message: error.message });
    }
  }

  return (
    <form onSubmit={submit} noValidate>
      <fieldset>
        <legend>Tipo de usuario</legend>
        <label><input type="radio" name="userType" value="anonymous" checked={values.userType === 'anonymous'} onChange={(event) => update('userType', event.target.value)} /> Anónimo</label>
        <label><input type="radio" name="userType" value="identified" checked={values.userType === 'identified'} onChange={(event) => update('userType', event.target.value)} /> Identificado</label>
      </fieldset>
      {values.userType === 'identified' && <>
        <label htmlFor="name">Nombre</label><input id="name" value={values.name} onChange={(event) => update('name', event.target.value)} />
        {errors.name && <p role="alert">{errors.name}</p>}
        <label htmlFor="semester">Semestre</label><input id="semester" value={values.semester} onChange={(event) => update('semester', event.target.value)} />
        {errors.semester && <p role="alert">{errors.semester}</p>}
      </>}
      <label htmlFor="category">Categoría</label>
      <select id="category" value={values.category} onChange={(event) => update('category', event.target.value)}>
        <option value="">Selecciona una categoría</option>
        {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
      {numberIsRequired(values.category) && <>
        <label htmlFor="locationNumber">Número</label><input id="locationNumber" maxLength="50" value={values.locationNumber} onChange={(event) => update('locationNumber', event.target.value)} />
        <span>{count.locationNumber}</span>
        {errors.locationNumber && <p role="alert">{errors.locationNumber}</p>}
      </>}
      <label htmlFor="subject">Asunto</label><input id="subject" minLength="5" maxLength="200" value={values.subject} onChange={(event) => update('subject', event.target.value)} />
      <span>{count.subject}</span>{errors.subject && <p role="alert">{errors.subject}</p>}
      <label htmlFor="description">Descripción</label><textarea id="description" minLength="20" maxLength="500" value={values.description} onChange={(event) => update('description', event.target.value)} />
      <span>{count.description}</span>{errors.description && <p role="alert">{errors.description}</p>}
      <EvidenceUploader files={files} onChange={setFiles} error={errors.files} />
      <PrivacyNotice checked={values.privacyAccepted} onChange={(checked) => update('privacyAccepted', checked)} error={errors.privacyAccepted} />
      <button type="submit" disabled={status.loading}>{status.loading ? 'Enviando...' : 'Enviar queja'}</button>
      {status.message && <p role="status">{status.message}</p>}
    </form>
  );
}
