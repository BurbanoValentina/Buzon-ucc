export function ComplaintFilters({ filters, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} aria-label="Filtros de quejas">
      <label htmlFor="filter-category">Categoría</label>
      <input id="filter-category" value={filters.category || ''} onChange={(event) => onChange({ ...filters, category: event.target.value })} />
      <label htmlFor="filter-status">Estado</label>
      <select id="filter-status" value={filters.status || ''} onChange={(event) => onChange({ ...filters, status: event.target.value })}>
        <option value="">Todos</option>
        <option value="PENDIENTE">Pendiente</option>
        <option value="COMPLETADA">Completada</option>
        <option value="NO_COMPLETADA">No completada</option>
      </select>
      <button type="submit">Filtrar</button>
    </form>
  );
}
