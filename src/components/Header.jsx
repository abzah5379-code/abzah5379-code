export default function Header({
  search, onSearch, onAdd, onManageUsers,
  total, lowCount, emptyCount,
  currentUser, onLogout,
}) {
  return (
    <header className="sticky top-0 z-10 glass-nav border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Title */}
          <div className="shrink-0">
            <h1 className="font-display font-bold text-xl text-on-surface leading-tight">Warehouse</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-label text-on-surface-variant">{total} drawers</span>
              {emptyCount > 0 && (
                <span className="text-label font-semibold text-red-600 bg-red-50 px-1.5 py-0.5 rounded-full border border-red-200">
                  {emptyCount} empty
                </span>
              )}
              {lowCount > 0 && (
                <span className="text-label font-semibold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200">
                  {lowCount} low
                </span>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none"
                width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="Drawer, item, or SKU…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-container-lowest border border-outline-variant text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary transition-colors"
              />
              {search && (
                <button
                  onClick={() => onSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2 ms-auto shrink-0">
            {/* Manage Users — manager only */}
            {onManageUsers && (
              <button
                onClick={onManageUsers}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-sm text-on-surface-variant border border-outline-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                title="Manage Users"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="hidden sm:inline">Users</span>
              </button>
            )}

            {/* Add Drawer — manager only */}
            {onAdd && (
              <button
                onClick={onAdd}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-sm text-white gradient-primary btn-scale shadow-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                <span className="hidden sm:inline">Add Drawer</span>
              </button>
            )}

            {/* User chip + logout */}
            <div className="flex items-center gap-1.5 pl-2 border-l border-outline-variant">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-semibold text-on-surface leading-tight">{currentUser.name}</p>
                <p className={`text-label font-semibold ${currentUser.role === 'manager' ? 'text-primary' : 'text-secondary'}`}>
                  {currentUser.role}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-white font-bold text-sm">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={onLogout}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors"
                title="Sign out"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
