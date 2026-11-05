export function EvidenceUploader({ files, onChange, error }) {
  return (
    <div>
      <label htmlFor="evidence">Evidencia (JPG, JPEG o PNG; máximo 5 imágenes de 100 MB)</label>
      <input id="evidence" type="file" accept="image/jpeg,image/png" multiple onChange={(event) => onChange([...event.target.files])} />
      <span>{files.length}/5 imágenes</span>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
