export default function Header({ search, onSearch, onAdd, total, lowCount, emptyCount }) {
  return (
    <header className="sticky top-0 z-10 glass-nav border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <h1 className="font-display font-bold text-xl text-on-surface leading-tight">מחסן</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-label text-on-surface-variant">{total} מגירות</span>
              {emptyCount > 0 && (
                <span className="text-label font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">
                  {emptyCount} ריקות
                </span>
              )}
              {lowCount > 0 && (
                <span className="text-label font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                  {lowCount} נמוך
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 max-w-sm">
            <div className="relative">
              <svg
                className="absolute end-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="מגירה, פריט או מק״ט…"
                className="w-full pe-9 ps-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors"
              />
              {search && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute start-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          <button
            onClick={onAdd}
            className="shrink-0 gradient-primary text-white px-4 py-2.5 rounded-xl font-semibold text-sm btn-scale shadow-sm flex items-center gap-1.5"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" />
            </svg>
            הוסף מגירה
          </button>
        </div>
      </div>
    </header>
  )
}
